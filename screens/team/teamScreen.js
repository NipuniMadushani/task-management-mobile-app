import { FlatList, ImageBackground,  StatusBar, StyleSheet, Text, Image, TouchableOpacity, View, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes, CommonStyles } from '../../constants/styles'
import { Touchable } from '../../components/touchable'
import { Menu } from 'react-native-material-menu';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { TabView, TabBar } from "react-native-tab-view";

const allEmployeesList = [
    {
        id: '1',
        image: require('../../assets/images/users/user3.png'),
        name: 'Jenny Wilson',
        totalTask: '20 task',
        completedTask: '10 completed',
        profession: 'Designer',
    },
    {
        id: '2',
        image: require('../../assets/images/users/user2.png'),
        name: 'Esther Howard',
        totalTask: '20 task',
        completedTask: '10 completed',
        profession: 'Back-end developer',
    },
    {
        id: '3',
        image: require('../../assets/images/users/user4.png'),
        name: 'Brooklyn Simmons',
        totalTask: '20 task',
        completedTask: '10 completed',
        profession: 'Back-end developer',
    },
    {
        id: '4',
        image: require('../../assets/images/users/user5.png'),
        name: 'Cameron Williamson',
        totalTask: '20 task',
        completedTask: '10 completed',
        profession: 'flutter develpoer',
    },
    {
        id: '5',
        image: require('../../assets/images/users/user6.png'),
        name: 'Jenny Wilson',
        totalTask: '20 task',
        completedTask: '10 completed',
        profession: 'Back-end developer',
    },
    {
        id: '6',
        image: require('../../assets/images/users/user7.png'),
        name: 'Cameron Williamson',
        totalTask: '20 task',
        completedTask: '10 completed',
        profession: 'Designer',
    },
    {
        id: '7',
        image: require('../../assets/images/users/user8.png'),
        name: 'Esther Howard',
        totalTask: '20 task',
        completedTask: '10 completed',
        profession: 'flutter develpoer',
    },
    {
        id: '8',
        image: require('../../assets/images/users/user9.png'),
        name: 'Brooklyn Simmons',
        totalTask: '20 task',
        completedTask: '10 completed',
        profession: 'flutter develpoer',
    },
    {
        id: '9',
        image: require('../../assets/images/users/user10.png'),
        name: 'Cameron Williamson',
        totalTask: '20 task',
        completedTask: '10 completed',
        profession: 'Back-end developer',
    }
];

const pendingList = [
    {
        id: '1',
        image: require('../../assets/images/users/user7.png'),
        name: 'Jenny Wilson',
        taskInfo: 'Not on task yet',
        profession: 'Designer',
    },
    {
        id: '2',
        image: require('../../assets/images/users/user8.png'),
        name: 'Esther Howard',
        taskInfo: 'Not on task yet',
        profession: 'Back-end developer',
    },
    {
        id: '3',
        image: require('../../assets/images/users/user9.png'),
        name: 'Brooklyn Simmons',
        taskInfo: 'Not on task yet',
        profession: 'flutter develpoer',
    },
    {
        id: '4',
        image: require('../../assets/images/users/user10.png'),
        name: 'Cameron Williamson',
        taskInfo: 'Not on task yet',
        profession: 'flutter develpoer',
    },
];

const teamOptions = ['Designer team', 'Developer team', 'HR team', 'Marketing team', 'Management team'];

const TeamScreen = ({ navigation }) => {

    const [showMenu, setshowMenu] = useState(false);
    const [selectedTeam, setselectedTeam] = useState(teamOptions[0]);
    const [index, setIndex] = useState(0);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            {header()}
            {tabBarInfo()}
            {addButton()}
        </View>
    )

    function addButton() {
        return (
            <View style={styles.addButtonOuterCircle}>
                <Touchable
                    onPress={() => { navigation.push('CreateTeam') }}
                    style={styles.addButtonInnerCircle}
                >
                    <MaterialIcons name="add" size={33} color={Colors.whiteColor} />
                </Touchable>
            </View>
        )
    }

    function tabBarInfo() {

        const routes = [
            { key: "first", title: "All employee" },
            { key: "second", title: "Pending" },
        ];

        const renderScene = ({ route }) => {
            switch (route.key) {
                case "first":
                    return <AllEmployee navigation={navigation} />
                case "second":
                    return <Pending navigation={navigation} />
            }
        };

        return (
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                renderTabBar={(props) => (
                    <TabBar
                        {...props}
                        indicatorStyle={{ height: 0 }}
                        style={{ backgroundColor: '#EDEDED', elevation: 0, }}
                        pressColor={Colors.bodyBackColor}
                        scrollEnabled={true}
                        renderLabel={({ route, focused }) => (
                            <Text
                                numberOfLines={1}
                                style={{ ...(focused ? { ...Fonts.primaryColor16SemiBold } : { ...Fonts.grayColor16SemiBold }), }}
                            >
                                {route.title}
                            </Text>
                        )}
                    />
                )}
            />
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
                        <Touchable onPress={() => { navigation.pop() }}>
                            <MaterialIcons name="arrow-back" size={24} color={Colors.whiteColor} />
                        </Touchable>
                        <Text numberOfLines={1} style={{ flex: 1, marginHorizontal: Sizes.fixPadding, ...Fonts.whiteColor18SemiBold }}>
                            Team
                        </Text>
                        <Menu
                            visible={showMenu}
                            anchor={
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => { setshowMenu(true) }}
                                    style={{ ...CommonStyles.rowAlignCenter }}
                                >
                                    <Text numberOfLines={1} style={{ ...Fonts.whiteColor14SemiBold }}>
                                        {selectedTeam}
                                    </Text>
                                    <MaterialIcons
                                        name='keyboard-arrow-down'
                                        color={Colors.whiteColor}
                                        size={22}
                                        style={{ marginLeft: Sizes.fixPadding - 5.0 }}
                                    />
                                </TouchableOpacity>

                            }
                            onRequestClose={() => { setshowMenu(false) }}
                        >
                            <View style={{ paddingVertical: Sizes.fixPadding , borderRadius: Sizes.fixPadding }}>
                                {
                                    teamOptions.map((option, index) => (
                                        <Text
                                            key={`${index}`}
                                            style={{ ...Fonts.blackColor16Medium, marginHorizontal: Sizes.fixPadding * 2.0, marginVertical: Sizes.fixPadding }}
                                            onPress={() => {
                                                setselectedTeam(option);
                                                setshowMenu(false);
                                            }}
                                        >
                                            {option}
                                        </Text>
                                    ))
                                }
                            </View>
                        </Menu>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

const AllEmployee = (props) => {
    const renderItem = ({ item }) => (
        <View style={{ ...styles.employInfoBox, ...CommonStyles.rowAlignCenter }}>
            <Image
                source={item.image}
                style={{ width: 52.0, height: 52.0, borderRadius: 26.0 }}
            />
            <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding }}>
                <Text numberOfLines={1} style={{ ...Fonts.blackColor15Medium }}>
                    {item.name}
                </Text>
                <Text numberOfLines={1} style={{ ...Fonts.grayColor14Medium, marginVertical: Sizes.fixPadding - 8.0 }}>
                    {item.totalTask} / {item.completedTask}
                </Text>
                <Text numberOfLines={1} style={{ ...Fonts.grayColor14Medium }}>
                    {item.profession}
                </Text>
            </View>
            <Touchable onPress={() => { props.navigation.push('Chat', { item }) }}>
                <Ionicons
                    name='chatbox-ellipses-outline'
                    color={Colors.primaryColor}
                    size={22}
                />
            </Touchable>
        </View>
    )
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={allEmployeesList}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: Sizes.fixPadding * 2.0, paddingBottom: Sizes.fixPadding * 5.0 }}
            />
        </View>
    )
}

const Pending = (props) => {
    const renderItem = ({ item }) => (
        <View style={styles.employInfoBox}>
            <View style={{ ...CommonStyles.rowAlignCenter, }}>
                <Image
                    source={item.image}
                    style={{ width: 52.0, height: 52.0, borderRadius: 26.0 }}
                />
                <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding }}>
                    <Text numberOfLines={1} style={{ ...Fonts.blackColor15Medium }}>
                        {item.name}
                    </Text>
                    <Text numberOfLines={1} style={{ ...Fonts.grayColor14Medium, marginVertical: Sizes.fixPadding - 8.0 }}>
                        {item.taskInfo}
                    </Text>
                    <Text numberOfLines={1} style={{ ...Fonts.grayColor14Medium }}>
                        {item.profession}
                    </Text>
                </View>
                <Touchable onPress={() => { props.navigation.push('Chat', { item }) }}>
                    <Ionicons
                        name='chatbox-ellipses-outline'
                        color={Colors.primaryColor}
                        size={22}
                    />
                </Touchable>
            </View>
            <View style={{ marginVertical: Sizes.fixPadding, height: 1, overflow: 'hidden' }}>
                <View style={{ borderWidth: 1, borderColor: Colors.grayColor, borderStyle: 'dashed' }} />
            </View>
            <View style={{ ...CommonStyles.rowAlignCenter }}>
                <View style={{ ...CommonStyles.rowAlignCenter, flex: 1, marginRight: Sizes.fixPadding }}>
                    <Feather name="check-square" size={16} color={Colors.grayColor} />
                    <Text numberOfLines={1} style={{ ...Fonts.grayColor14Medium, marginLeft: Sizes.fixPadding }}>
                        Invitation sent
                    </Text>
                </View>
                <Text style={{ ...Fonts.blackColor14Medium }}>
                    Cancel
                </Text>
            </View>
        </View>
    )
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={pendingList}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: Sizes.fixPadding * 2.0, paddingBottom: Sizes.fixPadding * 5.0 }}
            />
        </View>
    )
}

export default TeamScreen

const styles = StyleSheet.create({
    headerWrapStyle: {
        ...CommonStyles.rowAlignCenter,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingTop: StatusBar.currentHeight + Sizes.fixPadding * 1.5,
        paddingBottom: Sizes.fixPadding + 5.0
    },
    addButtonOuterCircle: {
        backgroundColor: Colors.primaryColor,
        position: 'absolute',
        bottom: 25.0,
        right: 20.0,
        width: 60.0,
        height: 60.0,
        borderRadius: 30.0,
    },
    addButtonInnerCircle: {
        backgroundColor: Colors.primaryColor,
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 4.0,
        width: 60.0,
        height: 60.0,
        borderRadius: 30.0,
        ...CommonStyles.center,
        ...CommonStyles.buttonShadow,
        shadowColor: Colors.blackColor,
        shadowOpacity: 0.25,
    },
    employInfoBox: {
        borderRadius: Sizes.fixPadding,
        padding: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.whiteColor,
        ...CommonStyles.shadow
    }
})