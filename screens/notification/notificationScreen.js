import { StyleSheet, View, Animated, Image, Text } from "react-native";
import React, { useState, useRef } from 'react'
import { Colors, Fonts, Sizes, CommonStyles, screenWidth } from '../../constants/styles'
import Header from '../../components/header'
import { SwipeListView } from "react-native-swipe-list-view";
import { Snackbar } from "react-native-paper";

const notificationsList = [
    {
        key: "1",
        image: require('../../assets/images/users/user2.png'),
        name: "Jenny wilsom",
        description: "Jenny wilsom share link check this immediately",
        time: "2min ago",
    },
    {
        key: "2",
        image: require('../../assets/images/users/user6.png'),
        name: "Esther Howard",
        description: "Esther howard add new task of food delivery app.",
        time: "4min ago",
    },
    {
        key: "3",
        image: require('../../assets/images/users/user9.png'),
        name: "Guy Hawkins",
        description: "Guy hawakins upload 2 file of food delivery app",
        time: "4min ago",
    },
    {
        key: "4",
        image: require('../../assets/images/users/user5.png'),
        name: "Kristin Watson",
        description: "Jenny wilsom share link check this immediately",
        time: "5min ago",
    },
];

const rowTranslateAnimatedValues = {};

const NotificationScreen = ({ navigation }) => {

    const [showSnackBar, setShowSnackBar] = useState(false);
    const [listData, setListData] = useState(notificationsList);

    Array(listData.length + 1)
        .fill("")
        .forEach((_, i) => {
            rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
        });

    const animationIsRunning = useRef(false);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <Header header='Notification' navigation={navigation} />
            <View style={{ flex: 1 }}>
                {listData.length == 0 ? noNotificationInfo() : notificationsInfo()}
            </View>
            {snackBar()}
        </View>
    )

    function noNotificationInfo() {
        return (
            <View style={styles.noNotificationPage}>
                <Image
                    source={require("../../assets/images/icons/notification_empty.png")}
                    style={{ width: 50, height: 50, resizeMode: "contain" }}
                />
                <Text style={{ ...Fonts.grayColor17Medium, marginTop: Sizes.fixPadding }} >
                    No new notification
                </Text>
            </View>
        );
    }

    function snackBar() {
        return (
            <Snackbar
                style={{ backgroundColor: Colors.blackColor }}
                elevation={0}
                duration={1000}
                visible={showSnackBar}
                onDismiss={() => setShowSnackBar(false)}
            >
                <Text style={{ ...Fonts.whiteColor14Medium }}>
                    Notification Dismissed!
                </Text>
            </Snackbar>
        );
    }

    function notificationsInfo() {
        const onSwipeValueChange = (swipeData) => {
            const { key, value } = swipeData;
            if (
                value > screenWidth ||
                (value < -screenWidth && !animationIsRunning.current)
            ) {
                animationIsRunning.current = true;
                Animated.timing(rowTranslateAnimatedValues[key], {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: false,
                }).start(() => {
                    const newData = [...listData];
                    const prevIndex = listData.findIndex((item) => item.key === key);
                    newData.splice(prevIndex, 1);
                    setListData(newData);
                    setShowSnackBar(true);
                    animationIsRunning.current = false;
                });
            }
        };

        const renderItem = (data) => (
            <View>
                <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
                    <View style={styles.notificationWrapper}>
                        <Image
                            source={data.item.image}
                            style={{ width: 50.0, height: 50.0, borderRadius: 25.0, }}
                        />
                        <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0 }}>
                            <View style={{ ...CommonStyles.rowAlignCenter }}>
                                <Text numberOfLines={1} style={{ ...Fonts.blackColor16SemiBold, flex: 1 }}>
                                    {data.item.name}
                                </Text>
                                <Text style={{ ...Fonts.grayColor14Medium }}>
                                    {data.item.time}
                                </Text>
                            </View>
                            <Text style={{ ...Fonts.blackColor14Regular }}>
                                {data.item.description}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        );

        const renderHiddenItem = (data) => <View style={styles.rowBack} />;

        return (
            <SwipeListView
                data={listData}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                rightOpenValue={-screenWidth}
                leftOpenValue={screenWidth}
                onSwipeValueChange={onSwipeValueChange}
                useNativeDriver={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: Sizes.fixPadding * 2.0 }}
            />
        );
    }
}

export default NotificationScreen

const styles = StyleSheet.create({
    rowBack: {
        backgroundColor: Colors.primaryColor,
        flex: 1,
        marginBottom: Sizes.fixPadding * 2.0
    },
    notificationWrapper: {
        backgroundColor: Colors.whiteColor,
        ...CommonStyles.shadow,
        ...CommonStyles.rowAlignCenter,
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding,
        padding: Sizes.fixPadding + 5.0,
        marginBottom: Sizes.fixPadding * 2.0
    },
    noNotificationPage: {
        flex: 1,
        ...CommonStyles.center,
    }
})