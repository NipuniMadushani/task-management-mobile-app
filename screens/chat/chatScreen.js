import { StyleSheet, Text, View, StatusBar, Image, FlatList, Platform, ImageBackground, TextInput, TouchableOpacity, KeyboardAvoidingView, SafeAreaView } from 'react-native'
import React, { useRef, useState } from 'react'
import { Sizes, Colors, Fonts, CommonStyles, screenWidth } from '../../constants/styles'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Touchable } from '../../components/touchable';

const userMessages = [
    {
        id: "1",
        message: "Hello please send me food delivery app design",
        isSender: false,
        time: "4:15 PM",
    },
    {
        id: "2",
        message: "Lorem ipsum dolor sit amet consectetur. Neque congue id ",
        isSender: true,
        time: "4:15 PM",
    },
    {
        id: "3",
        message: "Lorem ipsum dolor sit amet consectetur. Neque congue id ",
        isSender: false,
        time: "4:16 PM",
    },
    {
        id: "4",
        isSender: true,
        attachmentImage: require('../../assets/images/files/file6.png'),
        time: "4:16 PM",
    },
    {
        id: "5",
        message: "Lorem ipsum dolor sit amet consectetur. Neque congue id ",
        isSender: false,
        time: "4:17 PM",
    },
];

const ChatScreen = ({ navigation, route }) => {

    const user = route.params.item;

    const [messagesList, setMessagesList] = useState(userMessages);
    const [message, setMessage] = useState("");
    const fieldRef = useRef();

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'height' : null}
            style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}
        >
            {header()}
            {messages()}
            {typeMessage()}
        </KeyboardAvoidingView>
    )

    function messages() {
        const renderItem = ({ item }) => {
            return (
                <View
                    style={{
                        ...(!item.isSender ? { flexDirection: "row" } : null),
                        alignItems: item.isSender == true ? "flex-end" : "flex-start",
                        marginHorizontal: Sizes.fixPadding * 2.0,
                        marginVertical: Sizes.fixPadding + 2.5,
                    }}
                >
                    {item.isSender ? null : (
                        <Image
                            source={user.image}
                            style={styles.receiverImage}
                        />
                    )}
                    <View
                        style={{
                            ...styles.messageWrapStyle,
                            borderBottomRightRadius: item.isSender ? 0 : Sizes.fixPadding * 2.0,
                            borderTopLeftRadius: item.isSender ? Sizes.fixPadding * 2.0 : 0,
                            backgroundColor: item.isSender ? '#E9DFF6' : Colors.whiteColor,
                            ...item.isSender ? CommonStyles.buttonShadow : CommonStyles.shadow,
                        }}
                    >
                        {
                            item.message
                                ?
                                <Text style={{ ...Fonts.blackColor14Medium }}>{item.message}</Text>
                                :
                                <Image
                                    source={item.attachmentImage}
                                    style={{ width: screenWidth / 2.2, height: 126, resizeMode: 'contain' }}
                                />
                        }
                        <Text style={{ ...Fonts.grayColor12Medium, textAlign: "right", marginTop: Sizes.fixPadding - 5.0, }}>
                            {item.time}
                        </Text>
                    </View>
                </View>
            );
        };
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    inverted
                    data={messagesList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        flexDirection: "column-reverse",
                        paddingBottom: Sizes.fixPadding * 2.0,
                        paddingTop: Sizes.fixPadding * 2.0,
                    }}
                />
            </View>
        );
    }

    function addMessage({ message }) {
        const oldMessages = messagesList;

        let date = Date();
        let hour = new Date(date).getHours();
        let minute = new Date(date).getMinutes();
        let AmPm = hour >= 12 ? "PM" : "AM";
        let finalhour = hour > 12 ? hour - 12 : hour;
        let displayHour =
            finalhour.toString().length == 1 ? `0${finalhour}` : finalhour;
        let displayMinute = minute.toString().length == 1 ? `0${minute}` : minute;

        const newMessage = {
            id: messagesList.length + 1,
            message: message,
            time: `${displayHour}:${displayMinute} ${AmPm}`,
            isSender: true,
        };

        oldMessages.push(newMessage);
        setMessagesList(oldMessages);
    }

    function typeMessage() {
        return (
            <View style={styles.messageFieldBox}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => { fieldRef.current.focus() }}
                    style={styles.messageOptionIconWrapper}
                >
                    <MaterialIcons
                        name="attach-file"
                        size={20}
                        color={Colors.grayColor}
                        style={{ transform: [{ rotate: '50deg' }] }}
                    />
                </TouchableOpacity>
                <View style={{ ...styles.messageOptionIconWrapper, marginLeft: Sizes.fixPadding }} >
                    <MaterialIcons
                        name="mic-none"
                        size={20}
                        color={Colors.grayColor}
                    />
                </View>
                <TextInput
                    ref={fieldRef}
                    placeholder='Write comment..'
                    style={{ ...Fonts.blackColor14Medium, flex: 1, marginHorizontal: Sizes.fixPadding + 5.0 }}
                    placeholderTextColor={Colors.grayColor}
                    cursorColor={Colors.primaryColor}
                    selectionColor={Colors.primaryColor}
                    value={message}
                    onChangeText={setMessage}
                />
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        if (message != "") {
                            addMessage({ message: message });
                            setMessage("");
                        }
                    }}
                    style={styles.sendIconWrapper}
                >
                    <MaterialIcons name="send" size={20} color={Colors.primaryColor} />
                </TouchableOpacity>
            </View>
        )
    }

    function header() {
        return (
            <View style={{ backgroundColor: Colors.primaryColor }}>
                <ImageBackground
                    source={require('../../assets/images/top_image2.png')}
                    style={{ width: '100%' }}
                    tintColor='rgba(241, 183,255,0.8)'
                >
                    <SafeAreaView />
                    <View style={styles.headerWrapStyle}>
                        <Touchable onPress={() => { navigation.pop() }}>
                            <MaterialIcons name="arrow-back" size={24} color={Colors.whiteColor} />
                        </Touchable>
                        <Image
                            source={user.image}
                            style={{ width: 43.0, height: 43.0, borderRadius: 21.5, marginHorizontal: Sizes.fixPadding }}
                        />
                        <View style={{ flex: 1 }}>
                            <Text numberOfLines={1} style={{ ...Fonts.whiteColor18SemiBold }}>
                                {user.name}
                            </Text>
                            <Text numberOfLines={1} style={{ ...Fonts.whiteColor14Medium }}>
                                Developer
                            </Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

export default ChatScreen

const styles = StyleSheet.create({
    headerWrapStyle: {
        ...CommonStyles.rowAlignCenter,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingTop: StatusBar.currentHeight + Sizes.fixPadding * 1.5,
        paddingBottom: Sizes.fixPadding
    },
    messageOptionIconWrapper: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        width: 30.0,
        height: 30.0,
        ...CommonStyles.center,
        ...CommonStyles.shadow,
    },
    messageFieldBox: {
        backgroundColor: Colors.whiteColor,
        ...CommonStyles.shadow,
        ...CommonStyles.rowAlignCenter,
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        borderColor: '#ececec'
    },
    sendIconWrapper: {
        width: 40.0,
        height: 40.0,
        borderRadius: Sizes.fixPadding - 5.0,
        ...CommonStyles.center,
        ...CommonStyles.shadow,
        backgroundColor: '#FFFAFA'
    },
    messageWrapStyle: {
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding * 2.0,
        maxWidth: screenWidth - 150.0,
    },
    receiverImage: {
        width: 30.0,
        height: 30.0,
        borderRadius: 15.0,
        marginRight: Sizes.fixPadding - 3.0,
    },
})