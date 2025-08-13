import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes, CommonStyles } from '../../constants/styles'
import Header from '../../components/header'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const recentSearchesList = [
    'Food delivery app task',
    'Shopping project detail',
    'Website desisgn task',
    'Food delivery app task',
];

const SearchScreen = ({ navigation }) => {

    const [search, setSearch] = useState('');
    const [recentSearches, setrecentSearches] = useState(recentSearchesList)

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <Header header='Search' navigation={navigation} />
            {searchField()}
            {
                recentSearches.length !== 0
                    ?
                    <View style={{ flex: 1 }}>
                        <ScrollView showsVerticalScrollIndicator={false} automaticallyAdjustKeyboardInsets={true}>
                            {recentSearchInfo()}
                        </ScrollView>
                    </View>
                    :
                    null
            }
        </View>
    )

    function recentSearchInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <View style={{ ...CommonStyles.rowAlignCenter, }}>
                    <Text numberOfLines={1} style={{ ...Fonts.blackColor16Medium, flex: 1, }}>
                        Recent search
                    </Text>
                    <Text onPress={() => { setrecentSearches([]) }} style={{ ...Fonts.grayColor14Medium }}>
                        Clear all
                    </Text>
                </View>
                {
                    recentSearches.map((item, index) => (
                        <View
                            key={`${index}`}
                            style={{ ...CommonStyles.rowAlignCenter, marginTop: Sizes.fixPadding }}
                        >
                            <MaterialIcons name="history" size={22} color={Colors.grayColor} />
                            <Text style={{ ...Fonts.grayColor15Medium, marginLeft: Sizes.fixPadding, flex: 1 }}>
                                {item}
                            </Text>
                        </View>
                    ))
                }
            </View>
        )
    }

    function searchField() {
        return (
            <View style={styles.searchFieldWrapper}>
                <Ionicons
                    name='search'
                    color={search ? Colors.primaryColor : Colors.grayColor}
                    size={20}
                />
                <TextInput
                    value={search}
                    onChangeText={setSearch}
                    placeholder='Search here'
                    placeholderTextColor={Colors.grayColor}
                    style={{ ...Fonts.blackColor16Medium, padding: 0, flex: 1, marginLeft: Sizes.fixPadding }}
                    cursorColor={Colors.primaryColor}
                    selectionColor={Colors.primaryColor}
                />
            </View>
        )
    }
}

export default SearchScreen

const styles = StyleSheet.create({
    searchFieldWrapper: {
        ...CommonStyles.rowAlignCenter,
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        ...CommonStyles.shadow,
        margin: Sizes.fixPadding * 2.0,
        padding: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding + 5.0
    },
})