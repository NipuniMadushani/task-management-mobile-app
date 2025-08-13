import { ImageBackground, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Touchable } from './touchable'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors, Fonts, Sizes, CommonStyles, } from '../constants/styles';

const Header = (props) => {
    return (
        <View style={{ backgroundColor: Colors.primaryColor }}>
            <ImageBackground
                source={require('../assets/images/top_image2.png')}
                style={{ width: '100%' }}
                tintColor='rgba(241, 183,255,0.8)'
            >
                <SafeAreaView />
                <View style={styles.headerWrapStyle}>
                    <Touchable onPress={() => { props.navigation.pop() }}>
                        <MaterialIcons name="arrow-back" size={24} color={Colors.whiteColor} />
                    </Touchable>
                    <Text numberOfLines={1} style={{ flex: 1, marginLeft: Sizes.fixPadding, ...Fonts.whiteColor18SemiBold }}>
                        {props.header}
                    </Text>
                </View>
            </ImageBackground>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    headerWrapStyle: {
        ...CommonStyles.rowAlignCenter,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingTop: StatusBar.currentHeight + Sizes.fixPadding * 1.5,
        paddingBottom: Sizes.fixPadding + 5.0
    },
})