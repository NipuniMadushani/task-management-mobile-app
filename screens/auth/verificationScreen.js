import { ImageBackground, TouchableOpacity, Modal, ScrollView, StatusBar, Image, StyleSheet, Text, View,  SafeAreaView } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { Colors, Fonts, Sizes, CommonStyles, screenWidth } from '../../constants/styles'
import { Button } from '../../components/button';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Touchable } from '../../components/touchable';
import { OtpInput } from 'react-native-otp-entry';
import { Circle } from 'react-native-animated-spinkit';

const VerificationScreen = ({ navigation }) => {

    const [otpInput, setotpInput] = useState("");
    const [isLoading, setisLoading] = useState(false);
    const [time, setTime] = useState(60);
    const [screenFocus, setscreenFocus] = useState(false);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setscreenFocus(true);
        });
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            setscreenFocus(false);
        });
        return unsubscribe;
    }, [navigation]);

    const timeOutCallback = useCallback(
        () => setTime((currTimer) => (currTimer == 0 ? null : currTimer - 1)),
        []
    );

    useEffect(() => {
        time > 0 && screenFocus && setTimeout(timeOutCallback, 1000);
        () => {
            return clearTimeout(timeOutCallback);
        };
    }, [time, timeOutCallback, screenFocus]);

    const resetTimer = function () {
        if (!time) {
            setTime(22);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: Colors.primaryColor }}>
            <StatusBar translucent backgroundColor={'transparent'} barStyle={'light-content'} />
            <View style={{ flex: 1, }}>
                {topImageWithHeader()}
                {verificationInfo()}
                {loadingDialog()}
            </View>
        </View>
    )

    function loadingDialog() {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={isLoading}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <View style={{ justifyContent: "center", flex: 1 }}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => { }}
                            style={styles.dialogStyle}
                        >
                            <View style={{ ...CommonStyles.center }}>
                                <Circle size={50} color={Colors.primaryColor} style={{ marginTop: Sizes.fixPadding - 5.0 }} />
                                <Text style={{ ...Fonts.primaryColor20Medium, marginTop: Sizes.fixPadding + 2.0 }}>
                                    Please wait
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }

    function verificationInfo() {
        return (
            <View style={styles.verifyInfoWrapper}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    automaticallyAdjustKeyboardInsets={true}
                    style={{
                        borderTopLeftRadius: Sizes.fixPadding * 4.0,
                        borderTopRightRadius: Sizes.fixPadding * 4.0,
                        overflow: 'hidden'
                    }}
                >
                    {authGirlImage()}
                    {otpInfo()}
                    {timeInfo()}
                    {verifyButton()}
                    {resendInfo()}
                </ScrollView>
            </View>
        )
    }

    function timeInfo() {
        let minutes = Math.floor(time / 60);
        let extraSeconds = time % 60;
        return (
            <Text style={{ ...Fonts.primaryColor18Medium, textAlign: "center" }}>
                {minutes.toFixed(0).length == 1 ? `0${minutes.toFixed(0)}` : minutes.toFixed(0)}:{extraSeconds.toFixed(0).length == 1 ? `0${extraSeconds.toFixed(0)}` : extraSeconds.toFixed(0)}
            </Text>
        )
    }

    function otpInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginVertical: Sizes.fixPadding * 3.0 }}>
                <OtpInput
                    numberOfDigits={4}
                    focusColor={Colors.primaryColor}
                    onTextChange={text => {
                        if (text.length == 4) {
                            setotpInput(text);
                            setisLoading(true);
                            setTimeout(() => {
                                setisLoading(false);
                                navigation.push('BottomTabBar')
                            }, 2000);
                        }
                    }}
                    theme={{
                        inputsContainerStyle: { justifyContent: 'center' },
                        pinCodeContainerStyle: { ...styles.textFieldStyle },
                        pinCodeTextStyle: { ...Fonts.primaryColor20Medium },
                        focusStickStyle: { height: 25 },
                        focusedPinCodeContainerStyle: { borderColor: Colors.bodyBackColor }
                    }}
                />
            </View>
        )
    }

    function resendInfo() {
        return (
            <Text style={{ ...Fonts.grayColor18Medium, textAlign: 'center', }}>
                Didn’t receive code? { }
                <Text
                    onPress={() => { time == 0 ? resetTimer() : null; }}
                    style={{ ...Fonts.primaryColor18Medium, }}
                >
                    Resend
                </Text>
            </Text>
        )
    }

    function verifyButton() {
        return (
            <Button
                style={{ marginBottom: Sizes.fixPadding, marginTop: Sizes.fixPadding * 3.0 }}
                onPress={() => {
                    setisLoading(true);
                    setTimeout(() => {
                        setisLoading(false);
                        navigation.push('BottomTabBar')
                    }, 2000);
                }}
                buttonText='Verify'
            />
        )
    }

    function authGirlImage() {
        return (
            <Image
                source={require('../../assets/images/auth_girl.png')}
                style={styles.authGirlImageStyle}
            />
        )
    }

    function topImageWithHeader() {
        return (
            <ImageBackground
                source={require('../../assets/images/top_image.png')}
                style={{ width: '100%', height: 280.0, ...CommonStyles.center }}
                tintColor='rgba(241, 183,255,0.8)'
            >
               <View style={{ position: 'absolute', top: 0, left: 20.0 }}>
                    <SafeAreaView />
                    <Touchable
                        onPress={() => { navigation.pop() }}
                        style={{ marginTop: StatusBar.currentHeight + 15.0, }}
                    >
                        <MaterialIcons
                            name='arrow-back'
                            color={Colors.whiteColor}
                            size={24}
                        />
                    </Touchable>
                </View>
                <View style={{ marginHorizontal: Sizes.fixPadding * 5.0 }}>
                    <Text style={{ textAlign: 'center', ...Fonts.whiteColor22SemiBold }}>
                        OTP verification
                    </Text>
                    <Text style={{ marginTop: Sizes.fixPadding, ...Fonts.whiteColor15Medium, opacity: 0.8, textAlign: 'center' }}>
                        We will send one time password on this mobile number +91 1234567890
                    </Text>
                </View>
            </ImageBackground>
        )
    }
}

export default VerificationScreen

const styles = StyleSheet.create({
    verifyInfoWrapper: {
        marginTop: -Sizes.fixPadding * 4.0,
        flex: 1,
        backgroundColor: Colors.whiteColor,
        borderTopLeftRadius: Sizes.fixPadding * 4.0,
        borderTopRightRadius: Sizes.fixPadding * 4.0,
        overflow: 'hidden'
    },
    authGirlImageStyle: {
        width: 120.0,
        height: 120.0,
        resizeMode: 'contain',
        alignSelf: 'center',
        margin: Sizes.fixPadding * 4.0
    },   
    textFieldStyle: {
        borderRadius: Sizes.fixPadding,
        backgroundColor: Colors.whiteColor,
        ...CommonStyles.shadow,
        marginHorizontal: Sizes.fixPadding,
        width: screenWidth / 7.7,
        height: screenWidth / 7.7
    },
    dialogStyle: {
        backgroundColor: Colors.whiteColor,
        width: '80%',
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding,
        padding: Sizes.fixPadding * 2.0,
    }
})