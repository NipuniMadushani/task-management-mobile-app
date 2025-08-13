import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Colors, Sizes, Fonts, CommonStyles } from '../../constants/styles'
import Header from '../../components/header'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const faqsList = [
    {
        id: '1',
        question: 'How to create new task?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas amet ut eget eu nibh lorem velit. Id ornare lectus mauris, mauris. Pharetra, amet erat feugiat duis.Maecenas amet ut eget eu nibh lorem velit. Id ornare lectus mauris, mauris. Pharetra, amet erat feugiat duis.eget eu nibh lorem velit. Id ornare lectus mauris, mauris. Pharetra,',
        expanded: false,
    },
    {
        id: '2',
        question: 'How to create new project?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas amet ut eget eu nibh lorem velit. Id ornare lectus mauris, mauris. Pharetra, amet erat feugiat duis.Maecenas amet ut eget eu nibh lorem velit. Id ornare lectus mauris, mauris. Pharetra, amet erat feugiat duis.eget eu nibh lorem velit. Id ornare lectus mauris, mauris. Pharetra,',
        expanded: false,
    },
    {
        id: '3',
        question: 'How to add team member?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas amet ut eget eu nibh lorem velit. Id ornare lectus mauris, mauris. Pharetra, amet erat feugiat duis.Maecenas amet ut eget eu nibh lorem velit. Id ornare lectus mauris, mauris. Pharetra, amet erat feugiat duis.eget eu nibh lorem velit. Id ornare lectus mauris, mauris. Pharetra,',
        expanded: false,
    },
    {
        id: '4',
        question: 'How to create new team?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas amet ut eget eu nibh lorem velit. Id ornare lectus mauris, mauris. Pharetra, amet erat feugiat duis.Maecenas amet ut eget eu nibh lorem velit. Id ornare lectus mauris, mauris. Pharetra, amet erat feugiat duis.eget eu nibh lorem velit. Id ornare lectus mauris, mauris. Pharetra,',
        expanded: false,
    },
    {
        id: '5',
        question: 'How to create new task?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas amet ut eget eu nibh lorem velit. Id ornare lectus mauris, mauris. Pharetra, amet erat feugiat duis.Maecenas amet ut eget eu nibh lorem velit. Id ornare lectus mauris, mauris. Pharetra, amet erat feugiat duis.eget eu nibh lorem velit. Id ornare lectus mauris, mauris. Pharetra,',
        expanded: false,
    },
];

const FaqScreen = ({ navigation }) => {

    const [faqs, setfaqs] = useState(faqsList);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <Header header='FAQs' navigation={navigation} />
            {faqsInfo()}
        </View>
    )

    function changeFaqs(id) {
        const updatedFaqs = faqs.map((item) => {
            if (item.id == id) {
                return { ...item, expanded: !item.expanded }
            }
            else {
                return item
            }
        })
        setfaqs(updatedFaqs);
    }

    function faqsInfo() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { changeFaqs(item.id) }}
                style={styles.faqBoxStyle}
            >
                <View style={{ ...CommonStyles.rowAlignCenter }}>
                    <Text numberOfLines={1} style={{ ...Fonts.blackColor16Medium, flex: 1, }}>
                        {item.question}
                    </Text>
                    <MaterialIcons name={item.expanded ? 'keyboard-arrow-up' : "keyboard-arrow-down"} size={22} color={Colors.blackColor} />
                </View>
                {
                    item.expanded
                        ?
                        <Text style={{ ...Fonts.grayColor14Medium, marginTop: Sizes.fixPadding - 5.0 }}>
                            {item.answer}
                        </Text>
                        :
                        null
                }
            </TouchableOpacity>
        )
        return (
            <FlatList
                data={faqs}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                automaticallyAdjustKeyboardInsets={true}
                contentContainerStyle={{ paddingTop: Sizes.fixPadding * 2.0 }}
            />
        )
    }
}

export default FaqScreen

const styles = StyleSheet.create({
    faqBoxStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        ...CommonStyles.shadow,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding
    }
})