import { ScrollView, Text, View } from 'react-native'
import React from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles'
import Header from '../../components/header'

const privacyPolicies = [
    'Lorem ipsum dolor sit at scelerisque lacinia nulla tellus id dolor. Accumsan consectetur purus quis. Ultricies vel leo lacus quisque proin. Blandit neclorem pulvinar elementum odio bibendum dictmalesuada. ermentum ridiculus massa aliquet id. Cursus augue',
    'Lorem ipsum dolor sit at scelerisque lacinia nulla tellus id dolor. Accumsan consectetur purus quis. Ultricies vel leo lacus quisque proin. Blandit neclorem pulvinar elementum odio bibendum dictmalesuada. Turpis mi in ac habitant. Odio sit euismod  arcongue vestibulum aliquam. Et fames enim nullam etfacilisis aliquet. Lorem ultrices in fermentum ridiculus massa aliquet id. Cursus augue dictum purus egestas arcu',
    'Lorem ipsum dolor sit at scelerisque lacinia nulla tellus id dolor. Accumsan consectetur purus quis. Ultricies vel leo lacus quisque proin. Blandit neclorem pulvinar elementum odio bibendum dictmalesuada. Turpis mi in ac habitant. Odio sit euismod  arcongue vestibulum aliquam. Et fames enim nullam etfacilisis aliquet. Lorem ultrices in fermentum ridiculus massa aliquet id. Cursus augue dictum purus egestas arcu',
    'Lorem ipsum dolor sit at scelerisque lacinia nulla tellus id dolor. Accumsan consectetur purus quis. Ultricies vel leo lacus quisque proin. Blandit neclorem pulvinar elementum odio bibendum dictmalesuada. ermentum ridiculus massa aliquet id. Cursus augue',
    'Lorem ipsum dolor sit at scelerisque lacinia nulla tellus id dolor. Accumsan consectetur purus quis. Ultricies vel leo lacus quisque proin. Blandit neclorem pulvinar elementum odio bibendum dictmalesuada. ermentum ridiculus massa aliquet id. Cursus augue',
    'Lorem ipsum dolor sit at scelerisque lacinia nulla tellus id dolor. Accumsan consectetur purus quis. Ultricies vel leo lacus quisque proin. Blandit neclorem pulvinar elementum odio bibendum dictmalesuada. Turpis mi in ac habitant. Odio sit euismod  arcongue vestibulum aliquam. Et fames enim nullam etfacilisis aliquet. Lorem ultrices in fermentum ridiculus massa aliquet id. Cursus augue dictum purus egestas arcu',
];

const PrivacyPolicyScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <Header header='Privacy policy' navigation={navigation} />
            <ScrollView showsVerticalScrollIndicator={false}>
                {privacyInfo()}
            </ScrollView>
        </View>
    )

    function privacyInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0 }}>
                {
                    privacyPolicies.map((item, index) => (
                        <Text
                            key={`${index}`}
                            style={{ ...Fonts.grayColor14Medium, marginBottom: Sizes.fixPadding }}
                        >
                            {item}
                        </Text>
                    ))
                }
            </View>
        )
    }
}

export default PrivacyPolicyScreen