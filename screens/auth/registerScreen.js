import { ImageBackground, TextInput, ScrollView, StatusBar, Image, StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React, { useState, } from 'react'
import { Colors, Fonts, Sizes, CommonStyles } from '../../constants/styles'
import { Button } from '../../components/button';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Touchable } from '../../components/touchable';

const RegisterScreen = ({ navigation }) => {

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');

    return (
        <View style={{ flex: 1, backgroundColor: Colors.primaryColor }}>
            <StatusBar translucent backgroundColor={'transparent'} barStyle={'light-content'} />
            <View style={{ flex: 1, }}>
                {topImageWithHeader()}
                {registerInfo()}
            </View>
        </View>
    )

    function registerInfo() {
        return (
            <View style={styles.registerInfoWrapper}>
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
                    {userNameInfo()}
                    {emailInfo()}
                    {mobileNumberInfo()}
                    {registerButton()}
                </ScrollView>
            </View>
        )
    }

    function mobileNumberInfo() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding * 2.0, marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <Text style={{ ...Fonts.blackColor15Medium }}>
                    Mobile number
                </Text>
                <View style={styles.textFieldWrapper}>
                    <TextInput
                        placeholder='Enter your mobile number'
                        placeholderTextColor={Colors.grayColor}
                        style={{ ...Fonts.blackColor15Medium, padding: 0 }}
                        cursorColor={Colors.primaryColor}
                        selectionColor={Colors.primaryColor}
                        value={mobileNumber}
                        onChangeText={setMobileNumber}
                        keyboardType='number-pad'
                    />
                </View>
            </View>
        )
    }

    function emailInfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding * 3.0, marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <Text style={{ ...Fonts.blackColor15Medium }}>
                    Email address
                </Text>
                <View style={styles.textFieldWrapper}>
                    <TextInput
                        placeholder='Enter your email address'
                        placeholderTextColor={Colors.grayColor}
                        style={{ ...Fonts.blackColor15Medium, padding: 0 }}
                        cursorColor={Colors.primaryColor}
                        selectionColor={Colors.primaryColor}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType='email-address'
                    />
                </View>
            </View>
        )
    }

    function userNameInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <Text style={{ ...Fonts.blackColor15Medium }}>
                    User name
                </Text>
                <View style={styles.textFieldWrapper}>
                    <TextInput
                        placeholder='Enter user name'
                        placeholderTextColor={Colors.grayColor}
                        style={{ ...Fonts.blackColor15Medium, padding: 0 }}
                        cursorColor={Colors.primaryColor}
                        selectionColor={Colors.primaryColor}
                        value={userName}
                        onChangeText={setUserName}
                    />
                </View>
            </View>
        )
    }

    function registerButton() {
        return (
            <Button
                onPress={() => { navigation.push('Verification') }}
                buttonText='Register'
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
                        Register
                    </Text>
                    <Text style={{ marginTop: Sizes.fixPadding, ...Fonts.whiteColor15Medium, opacity: 0.8, textAlign: 'center' }}>
                        Welcome please create your account using email address
                    </Text>
                </View>
            </ImageBackground>
        )
    }
}

export default RegisterScreen

const styles = StyleSheet.create({
    registerInfoWrapper: {
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
    textFieldWrapper: {
        backgroundColor: Colors.whiteColor,
        ...CommonStyles.shadow,
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding + 4.0,
        marginTop: Sizes.fixPadding,
    }
})