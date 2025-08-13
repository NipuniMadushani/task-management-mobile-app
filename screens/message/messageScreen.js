import { ImageBackground, StyleSheet, Text, Image, View, StatusBar, TextInput, FlatList, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes, CommonStyles } from '../../constants/styles'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Touchable } from '../../components/touchable';

const usersList = [
    {
        id: '1',
        image: require('../../assets/images/users/user7.png'),
        name: 'Jenny Wilson',
        lastMsg: 'I will send update design',
        time: 'Now'
    },
    {
        id: '2',
        image: require('../../assets/images/users/user5.png'),
        name: 'Cody Fisher',
        lastMsg: 'I will send update design',
        time: '2:00AM'
    },
    {
        id: '3',
        image: require('../../assets/images/users/user2.png'),
        name: 'Esther Howard',
        lastMsg: 'I will send update design',
        time: '2:00AM'
    },
    {
        id: '4',
        image: require('../../assets/images/users/user6.png'),
        name: 'Jacob Jones',
        lastMsg: 'I will send update design',
        time: '2:30AM'
    },
    {
        id: '5',
        image: require('../../assets/images/users/user8.png'),
        name: 'Jane Cooper',
        lastMsg: 'I will send update design',
        time: 'Yesterday'
    },
    {
        id: '6',
        image: require('../../assets/images/users/user9.png'),
        name: 'Guy Hawkins',
        lastMsg: 'I will send update design',
        time: 'Yesterday'
    },
    {
        id: '7',
        image: require('../../assets/images/users/user10.png'),
        name: 'Jenny Wilson',
        lastMsg: 'I will send update design',
        time: '3 day ago'
    },
    {
        id: '8',
        image: require('../../assets/images/users/user11.png'),
        name: 'Annette Black',
        lastMsg: 'I will send update design',
        time: '3 day ago'
    },
    {
        id: '9',
        image: require('../../assets/images/users/user12.png'),
        name: 'Ronald Richards',
        lastMsg: 'I will send update design',
        time: '25 jan 2022'
    },
    {
        id: '10',
        image: require('../../assets/images/users/user13.png'),
        name: 'Ralph Edwards',
        lastMsg: 'I will send update design',
        time: '25 jan 2022'
    },
];

const MessageScreen = ({ navigation }) => {

    const [search, setSearch] = useState('');

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            {header()}
            {searchField()}
            {usersInfo()}
        </View>
    )

    function usersInfo() {
        const renderItem = ({ item }) => (
            <Touchable
                onPress={() => { navigation.push('Chat', { item }) }}
                style={styles.infoBox}
            >
                <Image
                    source={item.image}
                    style={{ width: 50.0, height: 50.0, borderRadius: 25.0 }}
                />
                <View style={{ flex: 1, marginLeft: Sizes.fixPadding }}>
                    <View style={{ ...CommonStyles.rowAlignCenter }}>
                        <Text
                            numberOfLines={1}
                            style={{ ...Fonts.blackColor15Medium, flex: 1, marginRight: Sizes.fixPadding }}
                        >
                            {item.name}
                        </Text>
                        <Text style={{ ...Fonts.grayColor13Medium }}>
                            {item.time}
                        </Text>
                    </View>
                    <Text numberOfLines={1} style={{ ...Fonts.grayColor14Medium, marginTop: Sizes.fixPadding - 8.0 }}>
                        {item.lastMsg}
                    </Text>
                </View>
            </Touchable>
        )
        return (
            <FlatList
                data={usersList}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: Sizes.fixPadding - 5.0 }}
                automaticallyAdjustKeyboardInsets={true}
            />
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

    function header() {
        return (
            <View style={{ backgroundColor: Colors.primaryColor }}>
                <ImageBackground
                    source={require('../../assets/images/top_image2.png')}
                    style={{ width: '100%' }}
                    tintColor='rgba(241, 183,255,0.8)'
                >
                    <SafeAreaView />
                    <View style={styles.headerWrapStyle}>
                        <View style={{ flex: 1 }}>
                            <Text numberOfLines={1} style={{ ...Fonts.whiteColor22SemiBold }}>
                                Message
                            </Text>
                            <Text numberOfLines={1} style={{ ...Fonts.whiteColor16Medium, opacity: 0.8 }}>
                                Easily chat with team
                            </Text>
                        </View>
                        <View style={{ height: 95.0, justifyContent: 'flex-end' }}>
                            <Image
                                source={require('../../assets/images/messages.png')}
                                style={{ width: 90, height: 80.0, resizeMode: 'stretch' }}
                            />
                        </View>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

export default MessageScreen

const styles = StyleSheet.create({
    headerWrapStyle: {
        ...CommonStyles.rowAlignCenter,
        justifyContent: 'space-between',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingTop: StatusBar.currentHeight + Sizes.fixPadding,
    },
    searchFieldWrapper: {
        ...CommonStyles.rowAlignCenter,
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        ...CommonStyles.shadow,
        margin: Sizes.fixPadding * 2.0,
        padding: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding + 5.0
    },
    infoBox: {
        backgroundColor: Colors.whiteColor,
        ...CommonStyles.shadow,
        padding: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding,
        ...CommonStyles.rowAlignCenter
    }
})