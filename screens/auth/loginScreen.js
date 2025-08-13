import { ImageBackground, Modal, TextInput, FlatList, TouchableOpacity, ScrollView, StatusBar, Image, StyleSheet, Text, View, Platform, BackHandler } from 'react-native'
import React, { useState, useRef, useCallback } from 'react'
import { Colors, Fonts, Sizes, CommonStyles } from '../../constants/styles'
import IntlPhoneInput from "react-native-intl-phone-input";
import { Button } from '../../components/button';
import { useFocusEffect } from '@react-navigation/native';
import { ExitToast } from '../../components/exitToast';

const LoginScreen = ({ navigation }) => {

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

    const [countries, setcountries] = useState();
    const [mobileNumber, setMobileNumber] = useState("");
    const [backClickCount, setBackClickCount] = useState(0);

    const phoneInput = useRef();

    return (
        <View style={{ flex: 1, backgroundColor: Colors.primaryColor }}>
            <StatusBar translucent backgroundColor={'transparent'} barStyle={'light-content'} />
            <View style={{ flex: 1, }}>
                {topImageWithHeader()}
                {loginInfo()}
            </View>
            {backClickCount == 1 ? <ExitToast /> : null}
        </View>
    )

    function loginInfo() {
        return (
            <View style={styles.loginInfoWrapper}>
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
                    {mobileNumberInfo()}
                    {loginButton()}
                </ScrollView>
            </View>
        )
    }

    function loginButton() {
        return (
            <Button
                onPress={() => { navigation.push('Register') }}
                buttonText='Login'
            />
        )
    }

    function mobileNumberInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding * 3.0 }}>
                <Text style={{ ...Fonts.blackColor16Medium }}>
                    Mobile number
                </Text>
                <IntlPhoneInput
                    ref={phoneInput}
                    onChangeText={({ phoneNumber }) => setMobileNumber(phoneNumber)}
                    defaultCountry="IN"
                    inputProps={{ cursorColor: Colors.primaryColor, selectionColor: Colors.primaryColor }}
                    containerStyle={styles.mobileFieldStyle}
                    placeholder={"Enter your mobile number"}
                    phoneInputStyle={{ flex: 1, ...Fonts.blackColor15Medium, }}
                    placeholderTextColor={Colors.grayColor}
                    dialCodeTextStyle={{ ...Fonts.blackColor15SemiBold, marginHorizontal: Sizes.fixPadding, }}
                    filterInputStyle={{ ...Fonts.whiteColor16SemiBold }}
                    flagStyle={{ fontSize: 0, width: 0, height: 0 }}
                    customModal={(modalVisible, allCountries, onCountryChange) => {
                        const filterCountries = (value) => {
                            const data = allCountries.filter(
                                (obj) =>
                                    obj.en.indexOf(value) > -1 || obj.dialCode.indexOf(value) > -1
                            );
                            setcountries(data);
                        };
                        return (
                            <View>
                                <Modal
                                    visible={modalVisible}
                                    transparent={true}
                                    onRequestClose={() => { phoneInput.current.hideModal() }}
                                    animationType="slide"
                                >
                                    <TouchableOpacity
                                        activeOpacity={1}
                                        onPress={() => { phoneInput.current.hideModal() }}
                                        style={{ flex: 1, justifyContent: "center", backgroundColor: "rgba(0,0,0,0.3)", }}
                                    >
                                        <TouchableOpacity
                                            activeOpacity={1}
                                            onPress={() => { }}
                                            style={styles.countryPickerModal}
                                        >
                                            <View>
                                                <TextInput
                                                    autoCapitalize="words"
                                                    autoFocus
                                                    style={styles.countrySearchFieldStyle}
                                                    cursorColor={Colors.primaryColor}
                                                    selectionColor={Colors.primaryColor}
                                                    onFocus={() => setcountries(allCountries)}
                                                    onChangeText={filterCountries}
                                                    placeholderTextColor={Colors.grayColor}
                                                    placeholder="Search"
                                                />
                                            </View>
                                            <FlatList
                                                contentContainerStyle={{ paddingTop: Sizes.fixPadding }}
                                                data={countries ? countries : allCountries}
                                                keyExtractor={(item, index) => index.toString()}
                                                showsVerticalScrollIndicator={false}
                                                renderItem={({ item }) => (
                                                    <TouchableOpacity
                                                        onPress={() => onCountryChange(item.code)}
                                                        style={{ ...CommonStyles.rowAlignCenter, marginVertical: Sizes.fixPadding - 5.0, }}
                                                    >
                                                        <Text style={{ fontSize: 25 }}>{item.flag}</Text>
                                                        <Text style={{ ...Fonts.blackColor15Medium, flex: 1, marginHorizontal: Sizes.fixPadding, }}>
                                                            {item.en}
                                                        </Text>
                                                        <Text style={{ ...Fonts.blackColor15SemiBold }}>
                                                            {item.dialCode}
                                                        </Text>
                                                    </TouchableOpacity>
                                                )}
                                            />
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                </Modal>
                            </View>
                        );
                    }}
                />
            </View>
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
                <View style={{ marginHorizontal: Sizes.fixPadding * 5.0 }}>
                    <Text style={{ textAlign: 'center', ...Fonts.whiteColor22SemiBold }}>
                        Login
                    </Text>
                    <Text style={{ marginTop: Sizes.fixPadding, ...Fonts.whiteColor15Medium, opacity: 0.8, textAlign: 'center' }}>
                        Welcome please login your account using mobile number
                    </Text>
                </View>
            </ImageBackground>
        )
    }
}

export default LoginScreen

const styles = StyleSheet.create({
    countryPickerModal: {
        height: "70%",
        marginHorizontal: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingTop: Sizes.fixPadding * 2.0,
    },
    countrySearchFieldStyle: {
        ...Fonts.blackColor15Medium,
        backgroundColor: Colors.whiteColor,
        ...CommonStyles.shadow,
        padding: Sizes.fixPadding + 3.0,
        borderRadius: Sizes.fixPadding - 5.0,
    },
    mobileFieldStyle: {
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding + 1.0,
        ...CommonStyles.shadow,
        marginTop: Sizes.fixPadding,
    },
    loginInfoWrapper: {
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
    }
})