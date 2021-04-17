import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, StyleSheet, SafeAreaView, Button, Modal, TouchableOpacity, Keyboard, Alert, AppState } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Searchbar } from 'react-native-paper'
import styled from 'styled-components/native'

import ResourceModal from '../components/ResourceModal'
import DisplaySectionList from '../components/DisplaySectionList'
import * as resourceActions from '../store/actions/saveResourceInfo.action'

import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();//Ignore all log notifications

export default MainScreen = (props) => {
    //initialize state
    const [modalIsVisible, setModalIsVisible] = useState(false)
    const [inputType, setInputType] = useState('')
    const [currentResource, setCurrentResource] = useState('')
    //const [sectionList, setSectionList] = useState([]) //may not need this
    const [index, setIndex] = useState(0)
    const [sectionButtonEnabled, setSectionButtonEnabled] = useState(true)
    const [searchFocused, setSearchFocused] = useState(false)
    const [filteredNotes, setFilteredNotes] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [listRefreshing, setListRefreshing] = useState(false)
    const dispatch = useDispatch()
    //console.log(resources)
    const resources = useSelector(state => state.resources.resourceList)

    useEffect(() => {

    }, [])

    useEffect(() => {
        if (resources.length > 0) {
            setSectionButtonEnabled(false)
            if (currentResource === '') { setCurrentResource(resources[0].name) }
        } else { setSectionButtonEnabled(true) }
    }, [resources])

    const addResourceModal = (type) => {
        setInputType(type)
        setModalIsVisible(true)
    }

    const setCurrent = (current, newIndex) => {
        // console.log(newIndex + ' index')
        // console.log(current + ' current')
        setIndex(newIndex)
        setCurrentResource(current)
        setModalIsVisible(false)
    }

    const saveResource = (name, title, description, type) => {
        if (type === 'Section' && title && description) {
            dispatch(resourceActions.saveSection(name, title, description))
        } else if (type === 'Resource') {
            dispatch(resourceActions.saveResource(name))
        }
        setModalIsVisible(false)
    }

    const unfocusKeyboard = () => {
        Keyboard.dismiss()
        setSearchFocused(false)
    }

    const searchNotes = (text) => {
        setSearchTerm(text)
        if (searchTerm.length > 0) {
            const newList = []
            console.log("first tier")
            for (i=0;i<resources.length;i++) {
                const temp = resources[i].sections.filter(item => item.title.toLowerCase().includes(text.toLowerCase()))
                for (j=0;j<temp.length;j++) {
                    if (temp[j] !== []) { newList.push(temp[j])}
                }
                console.log(newList)
            }
            return setFilteredNotes(newList)
        } else {
            return resources[index].sections
        }
    }
    
    const removeSectionHandler = (title) => {
        Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
            {text: 'No', style: 'default'},
            {text: 'Yes', style: 'descructive', onPress: () => {
                dispatch(resourceActions.removeSection(title))
            }}
        ])
        setListRefreshing(true) //This does not help and may need to remove.
        setTimeout(() => {
            setListRefreshing(false)
        }, 1000)
    }

    //Dynamic styles
    const NewSectionLabel = styled.Text`
        font-size: 20px;
        color: ${!sectionButtonEnabled ? 'blue' : 'gray'};
    `
    const ResourceLabel = styled.Text`
        font-size: 20px;
        color: ${!sectionButtonEnabled ? 'blue' : 'gray'};
    `
    
    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <Searchbar style={styles.searchbar} value={searchTerm} onChangeText={text => searchNotes(text)} onFocus={() => setSearchFocused(true)} placeholder='Search notes...' />
                    { !searchFocused
                        ? <Button style={styles.newButton} title="New" color="blue" onPress={() => {addResourceModal('Resource')}} />
                        : <Button style={styles.newButton} title="Done" color="blue" onPress={unfocusKeyboard} />
                    }
                </View>
                <TouchableOpacity style={styles.resourceContainer} disabled={sectionButtonEnabled} onPress={() => {addResourceModal('Select a Resource')}}>
                    { resources.length > 0 
                        ? <TouchableOpacity style={styles.resourcePicker}>
                            <ResourceLabel>{currentResource}</ResourceLabel>
                        </TouchableOpacity> 
                        : <ResourceLabel>No Resources Yet</ResourceLabel>
                    }
                </TouchableOpacity>
                <TouchableOpacity style={styles.sectionContainer} disabled={sectionButtonEnabled} onPress={() => {addResourceModal('Section')}} >
                    <NewSectionLabel>New Section</NewSectionLabel>
                </TouchableOpacity>
            </View>

            <View style={styles.body}>
                { resources.length > 0 ? <DisplaySectionList removeSectionHandler={removeSectionHandler} list={searchTerm.length > 0 ? filteredNotes : resources[index].sections} /> : null }
            </View>

            <Modal
                transparent={true}
                visible={modalIsVisible}
            >
                <ResourceModal type={inputType} listRefreshing={listRefreshing} closeModal={saveResource} list={resources} currentResource={currentResource} setCurrent={setCurrent} />
            </Modal>
            <StatusBar style="auto" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
      height: '25%',
      backgroundColor: 'white',
      borderBottomWidth: 0.5,
      width: '100%',
      alignItems: 'center'
    },
    body: {
      height: '75%',
      backgroundColor: '#dedfe0',
      width: '100%'
    },
    titleContainer: {
      paddingTop: 10,
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-around'
    },
    searchbar: {
        width: '80%',
        borderRadius: 5,
    },
    newButton: {
        width: '20%'
    },
    resourceContainer: {
      padding: 5,
      width: '95%',
      alignItems: 'center',
      borderWidth: 1,
      marginTop: 10,
      borderRadius: 5,
      shadowOpacity: 0.5,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 2,
      backgroundColor: 'white'
    },
    resourcePicker: { //haven't figured out why this doesnt work.
    },
    resourceName: {
      fontSize: 20,
    },
    sectionContainer: {
        padding: 5,
        width: '95%',
        alignItems: 'center',
        borderWidth: 1,
        marginTop: 10,
        borderRadius: 5,
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
        backgroundColor: 'white',
    },
  });