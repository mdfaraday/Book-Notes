import React from 'react'
import { FlatList } from 'react-native'

import SectionItem from './SectionItem'

export default DisplaySectionList = ({ list, removeSectionHandler, listRefreshing }) => {
    return (
        <FlatList 
            data={list}
            keyExtractor={(l, i) => i.toString()}
            refreshing={listRefreshing}
            renderItem={({ item }) => {
                return (
                    <SectionItem 
                        title={item.title}
                        description={item.description}
                        removeSectionHandler={removeSectionHandler}
                    />
                )
            }}
        />
    )
}