import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, Fonts, CommonStyles, Sizes } from '../constants/styles'
import { Touchable } from './touchable'

export const Button = (props) => {
    return (
        <Touchable
            onPress={() => props.onPress()}
            style={{ ...props.style, ...styles.buttonStyle }}
        >
            <Text style={{ ...Fonts.whiteColor18SemiBold }}>
                {props.buttonText}
            </Text>
        </Touchable>
    )
}

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: Colors.primaryColor,
        ...CommonStyles.center,
        borderRadius: Sizes.fixPadding,
        padding: Sizes.fixPadding + 2.0,
        margin: Sizes.fixPadding * 2.0,
        shadowColor: Colors.primaryColor,
        shadowOpacity: 0.2,
        shadowOffset: { x: 0, y: 6 },
        shadowRadius: 12
    }
})