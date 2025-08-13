import { ScrollView, StyleSheet, Text, Modal, TouchableOpacity, TextInput, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Colors, Fonts, Sizes, CommonStyles } from '../../constants/styles'
import Header from '../../components/header'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Touchable } from '../../components/touchable';
import { Menu, MenuItem } from 'react-native-material-menu';
import { Button } from '../../components/button';
import { Calendar } from "react-native-calendars";

const teamsList = ['Designer team', 'Developer team', 'HR team', 'Marketing team', 'Management team'];

const AddNewScreen = ({ navigation, route }) => {

    const from = route.params.from;

    useEffect(() => {
        if (route.params?.members) {
            setselectedMembers(route.params.members);
        }
    }, [route.params?.members]);

    const todayDate = new Date().toLocaleDateString();

    const [taskName, settaskName] = useState('');
    const [projectName, setprojectName] = useState('');
    const [startingDate, setstartingDate] = useState();
    const [endingDate, setendingDate] = useState();
    const [selectedMembers, setselectedMembers] = useState([]);
    const [selectedTeam, setselectedTeam] = useState('');
    const [showMenu, setshowMenu] = useState(false);
    const [showCalendar, setshowCalendar] = useState(false);
    const [selectedDate, setselectedDate] = useState("");
    const [defaultDate, setdefaultDate] = useState(new Date().getDate());
    const [dateSelectionFor, setdateSelectionFor] = useState('');
    const [showAttachmentSheet, setshowAttachmentSheet] = useState(false);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <Header header={from == 'task' ? 'Add new task' : 'Add new project'} navigation={navigation} />
            <View style={{ flex: 1 }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    automaticallyAdjustKeyboardInsets={true}
                >
                    {from == 'task' ? taskNameInfo() : null}
                    {projectNameInfo()}
                    {startingDateInfo()}
                    {endingDateInfo()}
                    {attachmentInfo()}
                    {teamInfo()}
                    {memberInfo()}
                </ScrollView>
            </View>
            {addButton()}
            {calendarDialog()}
            {attachmentSheet()}
        </View>
    )

    function attachmentSheet() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={showAttachmentSheet}
                onRequestClose={() => { setshowAttachmentSheet(false) }}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => { setshowAttachmentSheet(false); }}
                    style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <View style={{ justifyContent: "flex-end", flex: 1 }}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => { }}
                            style={styles.sheetWrapStyle}
                        >
                            <Text style={{ ...Fonts.blackColor16SemiBold }}>
                                Choose attachment
                            </Text>
                            {optionSort({ iconName: 'camera', color: Colors.darkBlueColor, option: 'Camera' })}
                            {optionSort({ iconName: 'image', color: Colors.darkGreenColor, option: 'Gallery' })}
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }

    function optionSort({ iconName, color, option }) {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { setshowAttachmentSheet(false) }}
                style={{ ...CommonStyles.rowAlignCenter, marginTop: Sizes.fixPadding * 2.0 }}
            >
                <View style={styles.optionCircle}>
                    <Ionicons
                        name={iconName}
                        color={color}
                        size={22}
                    />
                </View>
                <Text numberOfLines={1} style={{ ...Fonts.blackColor16Medium, flex: 1, marginLeft: Sizes.fixPadding + 5.0 }}>
                    {option}
                </Text>
            </TouchableOpacity>
        )
    }

    function calendarDialog() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={showCalendar}
                onRequestClose={() => { setshowCalendar(false) }}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => { setshowCalendar(false) }}
                    style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <View style={{ justifyContent: "center", flex: 1 }}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => { }}
                            style={styles.dialogStyle}
                        >
                            <Calendar
                                monthFormat={`MMMM  yyyy`}
                                renderArrow={(direction) =>
                                    direction == "left" ? (
                                        <MaterialIcons
                                            name="arrow-back-ios"
                                            color={Colors.grayColor}
                                            size={18}
                                        />
                                    ) : (
                                        <MaterialIcons
                                            name="arrow-forward-ios"
                                            color={Colors.grayColor}
                                            size={18}
                                        />
                                    )
                                }
                                hideExtraDays={true}
                                disableMonthChange={true}
                                firstDay={1}
                                onPressArrowLeft={(subtractMonth) => { setdefaultDate(); subtractMonth() }}
                                onPressArrowRight={(addMonth) => { setdefaultDate(); addMonth() }}
                                enableSwipeMonths={true}
                                dayComponent={({ date, state }) => {
                                    return (
                                        <TouchableOpacity
                                            activeOpacity={0.9}
                                            onPress={() => {
                                                setselectedDate(`${date.day}/${date.month}/${date.year}`);
                                                setdefaultDate(date.day);
                                            }}
                                            style={{
                                                ...styles.calenderDateWrapStyle,
                                                backgroundColor:
                                                    date.day == defaultDate
                                                        ? Colors.primaryColor
                                                        : Colors.whiteColor,
                                            }}
                                        >
                                            <Text
                                                style={
                                                    date.day == defaultDate
                                                        ? { ...Fonts.whiteColor16SemiBold }
                                                        : { ...Fonts.blackColor16Medium }
                                                }
                                            >
                                                {date.day}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                }}
                                theme={{
                                    calendarBackground: Colors.whiteColor,
                                    textSectionTitleColor: Colors.grayColor,
                                    monthTextColor: Colors.blackColor,
                                    textMonthFontFamily: 'Poppins-SemiBold',
                                    textDayHeaderFontFamily: 'Poppins-SemiBold',
                                    textMonthFontSize: 16,
                                    textDayHeaderFontSize: 12,
                                }}
                            />

                            <View style={styles.dialogButtonWrapper}>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => { setshowCalendar(false) }}
                                    style={{
                                        ...styles.dialogButtonStyle,
                                        backgroundColor: Colors.whiteColor,
                                        marginRight: Sizes.fixPadding * 1.5,
                                    }}
                                >
                                    <Text style={{ ...Fonts.blackColor16SemiBold }}>
                                        Cancel
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => {
                                        dateSelectionFor == 'start' ?
                                            setstartingDate(selectedDate ? selectedDate : todayDate) :
                                            setendingDate(selectedDate ? selectedDate : todayDate)
                                            ;
                                        setshowCalendar(false)
                                    }}
                                    style={{ ...styles.dialogButtonStyle, backgroundColor: Colors.primaryColor, }}
                                >
                                    <Text style={{ ...Fonts.whiteColor16SemiBold }}>
                                        Ok
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }

    function addButton() {
        return (
            <Button
                buttonText={from == 'task' ? 'Add task' : 'Add project'}
                onPress={() => { navigation.pop() }}
            />
        )
    }

    function teamInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <Text style={{ ...Fonts.blackColor16Medium }}>
                    Select team
                </Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => { setshowMenu(true) }}
                    style={{ ...styles.infoBox, ...CommonStyles.rowAlignCenter }}
                >
                    <Text numberOfLines={1} style={{ ...selectedTeam ? { ...Fonts.blackColor15Medium } : { ...Fonts.grayColor15Medium }, flex: 1 }}>
                        {selectedTeam ? selectedTeam : 'Select team'}
                    </Text>
                    <Menu
                        visible={showMenu}
                        anchor={
                            <Ionicons
                                name='chevron-down'
                                color={Colors.grayColor}
                                size={20}
                            />
                        }
                        onRequestClose={() => { setshowMenu(false) }}
                    >
                        <View style={{ paddingTop: Sizes.fixPadding - 5.0, borderRadius: Sizes.fixPadding, }}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                {
                                    teamsList.map((option, index) => (
                                        <MenuItem
                                            key={`${index}`}
                                            textStyle={{ ...Fonts.blackColor16Medium }}
                                            onPress={() => {
                                                setselectedTeam(option);
                                                setshowMenu(false);
                                            }}
                                        >
                                            {option}
                                        </MenuItem>
                                    ))
                                }
                            </ScrollView>
                        </View>
                    </Menu>
                </TouchableOpacity>
            </View>
        )
    }

    function memberInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0 }}>
                <Text style={{ ...Fonts.blackColor16Medium }}>
                    Select team member
                </Text>
                <Touchable
                    onPress={() => {
                        navigation.push('InviteMember', { inviteFor: 'addTask' })
                    }}
                    style={{ ...styles.infoBox, ...CommonStyles.rowAlignCenter }}
                >
                    {
                        selectedMembers.length == 0
                            ?
                            <Text style={{ ...Fonts.grayColor15Medium, flex: 1, }}>
                                Select member
                            </Text>
                            :
                            <View style={{ ...CommonStyles.rowAlignCenter, flex: 1 }}>
                                {
                                    selectedMembers.slice(0, 4).map((item, index) => (
                                        <Image
                                            key={`${index}`}
                                            source={item.image}
                                            style={{ ...styles.selectedMemberStyle, left: -(index * 6) }}
                                        />
                                    ))
                                }
                                {
                                    selectedMembers.length > 4
                                        ?
                                        <View style={{ ...styles.selectedMemberStyle, ...CommonStyles.center, left: -25.0 }}>
                                            <Text style={{ ...Fonts.blackColor12SemiBold }}>
                                                +{selectedMembers.length - 4}
                                            </Text>
                                        </View>
                                        :
                                        null
                                }
                            </View>
                    }
                    <View style={styles.addIconOuterCircle} >
                        <View style={styles.addIconinnerCircle}>
                            <MaterialIcons
                                name='add'
                                color={Colors.whiteColor}
                                size={12}
                            />
                        </View>
                    </View>
                </Touchable>
            </View>
        )
    }

    function attachmentInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0 }}>
                <Text style={{ ...Fonts.blackColor16Medium }}>
                    Attachment
                </Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => { setshowAttachmentSheet(true) }}
                    style={{ ...styles.infoBox, ...CommonStyles.rowAlignCenter }}
                >
                    <View style={styles.attachmentIconWrapper}>
                        <MaterialIcons
                            name="attach-file"
                            size={18}
                            color={Colors.primaryColor}
                            style={{ transform: [{ rotate: '50deg' }] }}
                        />
                    </View>
                    <Text numberOfLines={1} style={{ ...Fonts.grayColor15Medium, flex: 1, marginLeft: Sizes.fixPadding }}>
                        Attach file
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    function endingDateInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <Text style={{ ...Fonts.blackColor16Medium }}>
                    Ending date
                </Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => { setdateSelectionFor('end'); setshowCalendar(true) }}
                    style={{ ...styles.infoBox, paddingVertical: Sizes.fixPadding + 3.0 }}
                >
                    <Text style={endingDate ? { ...Fonts.blackColor15Medium } : { ...Fonts.grayColor15Medium }}>
                        {endingDate ? endingDate : 'Enter ending date'}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    function startingDateInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0 }}>
                <Text style={{ ...Fonts.blackColor16Medium }}>
                    Starting date
                </Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => { setdateSelectionFor('start'); setshowCalendar(true) }}
                    style={{ ...styles.infoBox, paddingVertical: Sizes.fixPadding + 3.0 }}
                >
                    <Text style={startingDate ? { ...Fonts.blackColor15Medium } : { ...Fonts.grayColor15Medium }}>
                        {startingDate ? startingDate : 'Enter Starting date'}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    function projectNameInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginTop: from == 'task' ? 0 : Sizes.fixPadding * 2.0 }}>
                <Text style={{ ...Fonts.blackColor16Medium }}>
                    Project name
                </Text>
                <View style={styles.infoBox}>
                    <TextInput
                        value={projectName}
                        onChangeText={setprojectName}
                        placeholder='Enter project name'
                        placeholderTextColor={Colors.grayColor}
                        style={{ ...Fonts.blackColor15Medium, padding: 0 }}
                        cursorColor={Colors.primaryColor}
                        selectionColor={Colors.primaryColor}
                    />
                </View>
            </View>
        )
    }

    function taskNameInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0 }}>
                <Text style={{ ...Fonts.blackColor16Medium }}>
                    Task name
                </Text>
                <View style={styles.infoBox}>
                    <TextInput
                        value={taskName}
                        onChangeText={settaskName}
                        placeholder='Enter task name'
                        placeholderTextColor={Colors.grayColor}
                        style={{ ...Fonts.blackColor15Medium, padding: 0 }}
                        cursorColor={Colors.primaryColor}
                        selectionColor={Colors.primaryColor}
                    />
                </View>
            </View>
        )
    }
}

export default AddNewScreen

const styles = StyleSheet.create({
    infoBox: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        ...CommonStyles.shadow,
        padding: Sizes.fixPadding + 2.0,
        marginTop: Sizes.fixPadding,
    },
    attachmentIconWrapper: {
        width: 26.0,
        height: 26.0,
        borderRadius: 13.0,
        backgroundColor: Colors.whiteColor, ...CommonStyles.shadow,
        ...CommonStyles.center
    },
    selectedMemberStyle: {
        width: 25.0,
        height: 25.0,
        borderColor: Colors.whiteColor,
        borderWidth: 2.0,
        borderRadius: 13.0,
        backgroundColor: Colors.extraLightGrayColor,
        overflow: 'hidden'
    },
    addIconOuterCircle: {
        backgroundColor: Colors.primaryColor,
        width: 16,
        height: 16,
        borderRadius: 8.0,
    },
    addIconinnerCircle: {
        width: 16.0,
        height: 16.0,
        borderRadius: 8.0,
        ...CommonStyles.center,
        backgroundColor: Colors.primaryColor,
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 2.0,
        ...CommonStyles.buttonShadow,
        shadowColor: Colors.blackColor,
        shadowOpacity: 0.25,
    },
    calenderDateWrapStyle: {
        alignItems: "center",
        justifyContent: "center",
        width: 28.0,
        height: 28.0,
        borderRadius: Sizes.fixPadding - 7.0,
    },
    dialogButtonStyle: {
        ...CommonStyles.shadow,
        ...CommonStyles.center,
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        minWidth: 105
    },
    dialogButtonWrapper: {
        ...CommonStyles.rowAlignCenter,
        marginHorizontal: Sizes.fixPadding,
        marginVertical: Sizes.fixPadding * 1.5,
        justifyContent: 'flex-end'
    },
    dialogStyle: {
        backgroundColor: Colors.whiteColor,
        alignSelf: 'center',
        width: '85%',
        borderRadius: Sizes.fixPadding,
        padding: Sizes.fixPadding
    },
    sheetWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderTopLeftRadius: Sizes.fixPadding * 2.0,
        borderTopRightRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding * 2.5
    },
    optionCircle: {
        width: 40.0,
        height: 40.0,
        borderRadius: 20.0,
        backgroundColor: Colors.whiteColor,
        ...CommonStyles.shadow,
        ...CommonStyles.center
    }
})