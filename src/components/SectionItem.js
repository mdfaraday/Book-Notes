import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, Card, Title, Paragraph } from 'react-native-paper'
import { useDispatch } from 'react-redux'

import * as resourceActions from '../store/actions/saveResourceInfo.action'

export default SectionItem = ({ title, description, removeSectionHandler }) => {
    const dispatch = useDispatch()

    

    return (
        <Card style={styles.card}>
            <Card.Title titleStyle={styles.title} title={title} />
            <Card.Content>
                <Paragraph style={styles.paragraph}>{description}</Paragraph>
            </Card.Content>
            <Card.Actions>
                <Button onPress={() => removeSectionHandler(title)}>Remove</Button>
            </Card.Actions>
        </Card>
    )
}

// export default ResourceItem = ({ title, description }) => {
//     return (
//         <View style={styles.container}>
//             <View style={styles.titleCard}>
//                 <Text style={styles.title}>{title}</Text>
//             </View>
//             <View style={styles.descriptionCard}>
//                 <Text style={styles.description}>{description}</Text>
//             </View>
//         </View>
//     )
// }

const styles = StyleSheet.create({
    card: {
        margin: 15,
    },
    title: {
        fontSize: 28
    },
    paragraph: {
        fontSize: 18,
    }
    // container: {
    //     flex: 1,
    //     width: '100%',
    //     alignItems: 'center'
    // },
    // titleCard: {
    //     alignSelf: 'flex-start',
    //     marginLeft: 10,
    //     marginBottom: 5
    // },
    // title: {
    //     fontSize: 28,
    //     //fontFamily: ''
    // },
    // descriptionCard: {
    //     width: '90%',
    //     borderRadius: 5,
    //     minHeight: 100,
    //     padding: 5,
    //     marginBottom: 20,
    //     shadowColor: 'black',
    //     shadowRadius: 2,
    //     shadowOffset: {width: 0, height: 2},
    //     shadowOpacity: 0.5,
    //     borderWidth: 0,
    //     backgroundColor: 'white'
    // },
    // description: {
    //     fontSize: 20,
    //     //fontFamily: ''
    // },

})