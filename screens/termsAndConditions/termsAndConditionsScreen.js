import { ScrollView, Text, View } from 'react-native'
import React from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles'
import Header from '../../components/header'

const companyPolicies = [
    'Lorem ipsum dolor sit at scelerisque lacinia nulla tellus id dolor. Accumsan consectetur purus quis. Ultricies vel leo lacus quisque proin. Blandit neclorem pulvinar elementum odio bibendum dictmalesuada. ermentum ridiculus massa aliquet id. Cursus augue ',
    'Lorem ipsum dolor sit at scelerisque lacinia nulla tellus id dolor. Accumsan consectetur purus quis. Ultricies vel leo lacus quisque proin. Blandit neclorem pulvinar elementum odio bibendum dictmalesuada. Turpis mi in ac habitant. Odio sit euismod  arcongue vestibulum aliquam. Et fames enim nullam etfacilisis aliquet. Lorem ultrices in fermentum ridiculus massa aliquet id. Cursus augue dictum purus egestas arcu',
];

const termsAndConditions = [
    'Lorem ipsum dolor sit at scelerisque lacinia nulla tellus id dolor. Accumsan consectetur purus quis. Ultricies vel leo lacus quisque proin. Blandit neclorem pulvinar elementum odio bibendum dictmalesuada. ermentum ridiculus massa aliquet id. Cursus augue ',
    'Lorem ipsum dolor sit at scelerisque lacinia nulla tellus id dolor. Accumsan consectetur purus quis. Ultricies vel leo lacus quisque proin. Blandit neclorem pulvinar elementum odio bibendum dictmalesuada. Turpis mi in ac habitant. Odio sit euismod  arcongue vestibulum aliquam. Et fames enim nullam etfacilisis aliquet. Lorem ultrices in fermentum ridiculus massa aliquet id. Cursus augue dictum purus egestas arcu',
    'Lorem ipsum dolor sit at scelerisque lacinia nulla tellus id dolor. Accumsan consectetur purus quis. Ultricies vel leo lacus quisque proin. Blandit neclorem pulvinar elementum odio bibendum dictmalesuada. Turpis mi in ac habitant. Odio sit euismod  arcongue vestibulum aliquam. Et fames enim nullam etfacilisis aliquet. Lorem ultrices in fermentum ridiculus massa aliquet id. Cursus augue dictum purus egestas arcu',
];

const TermsAndConditionsScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <Header header='Terms & condition' navigation={navigation} />
            <ScrollView showsVerticalScrollIndicator={false}>
                {companyPolicyInfo()}
                {termsAndConditionInfo()}
            </ScrollView>
        </View>
    )

    function termsAndConditionInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding * 2.0 }}>
                <Text style={{ ...Fonts.blackColor16Medium }}>
                    Terms & condition
                </Text>
                {
                    termsAndConditions.map((item, index) => (
                        <Text
                            key={`${index}`}
                            style={{ ...Fonts.grayColor14Medium, marginTop: Sizes.fixPadding }}
                        >
                            {item}
                        </Text>
                    ))
                }
            </View>
        )
    }

    function companyPolicyInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0 }}>
                <Text style={{ ...Fonts.blackColor16Medium }}>
                    Company’s terms of use
                </Text>
                {
                    companyPolicies.map((item, index) => (
                        <Text
                            key={`${index}`}
                            style={{ ...Fonts.grayColor14Medium, marginTop: Sizes.fixPadding }}
                        >
                            {item}
                        </Text>
                    ))
                }
            </View>
        )
    }
}

export default TermsAndConditionsScreen