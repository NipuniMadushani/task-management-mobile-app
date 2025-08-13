import { Image, StyleSheet, Text, View, FlatList, Platform, TouchableOpacity, BackHandler } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { Colors, Sizes, screenWidth, Fonts, CommonStyles } from '../../constants/styles'
import MyStatusBar from '../../components/myStatusBar'
import { useFocusEffect } from '@react-navigation/native';
import { ExitToast } from '../../components/exitToast';

const onboardingScreenList = [
    {
        id: '1',
        title: 'Organize your task',
        description: 'Lorem ipsum dolor sit amet consectetur. Quam risus sem amet. Condimentum magna vitae mauris sed integer lacus nec arcu. Gravida s',
        image: require('../../assets/images/onboarding/onboarding1.png')
    },
    {
        id: '2',
        title: 'Organize your project',
        description: 'Lorem ipsum dolor sit amet consectetur. Quam risus sem amet. Condimentum magna vitae mauris sed integer lacus nec arcu. Gravida s',
        image: require('../../assets/images/onboarding/onboarding2.png')
    },
    {
        id: '3',
        title: 'Always connect with team',
        description: 'Lorem ipsum dolor sit amet consectetur. Quam risus sem amet. Condimentum magna vitae mauris sed integer lacus nec arcu. Gravida s',
        image: require('../../assets/images/onboarding/onboarding3.png')
    },
];

const OnboardingScreen = ({ navigation }) => {

    const backAction = () => {
        if (Platform.OS == "ios") {
            navigation.addListener("beforeRemove", (e) => {
                e.preventDefault();
            });
        } else {
            backClickCount == 1 ? BackHandler.exitApp() : _spring();
        }
        return true;
    };

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            navigation.addListener("gestureEnd", backAction);
            return () => {
                BackHandler.removeEventListener("hardwareBackPress", backAction);
                navigation.removeListener("gestureEnd", backAction);
            };
        }, [backAction])
    );

    function _spring() {
        setBackClickCount(1);
        setTimeout(() => {
            setBackClickCount(0);
        }, 1000);
    }

    const listRef = useRef();
    const [currentScreen, setCurrentScreen] = useState(0);
    const [backClickCount, setBackClickCount] = useState(0);

    const scrollToIndex = ({ index }) => {
        listRef.current.scrollToIndex({ animated: true, index: index });
        setCurrentScreen(index);
    };

    return (
        <View style={{ flex: 1, backgroundColor: Colors.primaryColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                {backgroundView()}
                {onboardingContent()}
                {indicators()}
                {currentScreen == 2 ? null : skipText()}
            </View>
            {nextAndGetStartedInfo()}
            {backClickCount == 1 ? <ExitToast /> : null}
        </View>
    )

    function indicators() {
        return (
            <View style={styles.indicatorsWrapStyle}>
                {onboardingScreenList.map((item, index) => {
                    return (
                        <View
                            key={`${item.id}`}
                            style={{
                                ...(currentScreen == index
                                    ? styles.selectedIndicatorStyle
                                    : styles.indicatorStyle),
                            }}
                        />
                    );
                })}
            </View>
        )
    }

    function backgroundView() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ height: 250.0, }} />
                <View style={styles.imageWrapper} />
            </View>
        )
    }

    function nextAndGetStartedInfo() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    currentScreen == 2
                        ? navigation.push("Login")
                        : scrollToIndex({ index: currentScreen + 1 });
                }}
                style={{
                    ...styles.nextAndGetStartedButtonStyle,
                    borderTopWidth: Platform.OS == 'ios' ? 0 : 3.0
                }}
            >
                <Text style={{ ...Fonts.primaryColor18SemiBold }}>
                    {currentScreen == 2 ? 'Get  started' : 'Next'}
                </Text>
            </TouchableOpacity>
        )
    }

    function skipText() {
        return (
            <Text
                onPress={() => { navigation.push('Login') }}
                style={styles.skipTextStyle}
            >
                Skip
            </Text>
        )
    }

    function onScrollEnd(e) {
        let contentOffset = e.nativeEvent.contentOffset;
        let viewSize = e.nativeEvent.layoutMeasurement;
        let pageNum = Math.floor(contentOffset.x / viewSize.width);
        setCurrentScreen(pageNum);
    }

    function onboardingContent() {
        const renderItem = ({ item }) => {
            return (
                <View style={styles.onboardingContentStyle}>
                    <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, ...CommonStyles.center, height: 250.0 }}>
                        <Text numberOfLines={1} style={{ ...Fonts.whiteColor24SemiBold }}>
                            {item.title}
                        </Text>
                        <Text numberOfLines={3} style={{ marginTop: Sizes.fixPadding, ...Fonts.whiteColor14Medium, textAlign: 'center' }}>
                            {item.description}
                        </Text>
                    </View>
                    <View style={{ flex: 1, ...CommonStyles.center }}>
                        <Image
                            source={item.image}
                            style={{
                                width: screenWidth / 1.3,
                                height: screenWidth / 1.3,
                                resizeMode: "contain",
                            }}
                        />
                    </View>
                </View>
            );
        };
        return (
            <FlatList
                ref={listRef}
                data={onboardingScreenList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                horizontal
                scrollEventThrottle={32}
                pagingEnabled
                onMomentumScrollEnd={onScrollEnd}
                showsHorizontalScrollIndicator={false}
                style={styles.onboardingPage}
            />
        )
    }
}

export default OnboardingScreen

const styles = StyleSheet.create({
    onboardingPage: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 100,
    },
    onboardingContentStyle: {
        flex: 1,
        width: screenWidth,
        height: "100%",
        overflow: "hidden",
    },
    imageWrapper: {
        flex: 1,
        backgroundColor: Colors.whiteColor,
        borderTopLeftRadius: Sizes.fixPadding * 4.0,
        borderTopRightRadius: Sizes.fixPadding * 4.0,
    },
    skipTextStyle: {
        position: 'absolute',
        right: 20.0,
        top: 20.0,
        ...Fonts.whiteColor16SemiBold,
        zIndex: 100,
    },
    selectedIndicatorStyle: {
        width: 30.0,
        height: 8.0,
        borderRadius: 40.0,
        backgroundColor: Colors.primaryColor,
        marginHorizontal: Sizes.fixPadding - 7.0
    },
    indicatorStyle: {
        width: 8.0,
        height: 8.0,
        borderRadius: 4.0,
        backgroundColor: 'rgba(217, 217, 217, 0.5)',
        marginHorizontal: Sizes.fixPadding - 7.0
    },
    nextAndGetStartedButtonStyle: {
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Sizes.fixPadding + 5.0,
        shadowColor: Colors.blackColor,
        shadowOpacity: 0.25,
        shadowOffset: { x: 0, y: 0 },
        shadowRadius: 6,
        elevation: 20.0,
        borderTopColor: Colors.bodyBackColor,
    },
    indicatorsWrapStyle: {
        ...CommonStyles.rowAlignCenter,
        position: 'absolute',
        top: 270.0,
        left: 0,
        right: 0,
        justifyContent: "center",
        marginBottom: Sizes.fixPadding * 3.5,
    }
})