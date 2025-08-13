import { ScrollView, StyleSheet, Text, TextInput, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Colors, Fonts, Sizes, CommonStyles } from '../../constants/styles'
import Header from '../../components/header'
import { Touchable } from '../../components/touchable'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Button } from '../../components/button'

const CreateTeamScreen = ({ navigation, route }) => {

    useEffect(() => {
        if (route.params?.members) {
            setselectedMembers(route.params.members);
        }
    }, [route.params?.members]);

    const [teamName, setTeamName] = useState('');
    const [selectedMembers, setselectedMembers] = useState([]);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <Header header='Create team' navigation={navigation} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                automaticallyAdjustKeyboardInsets={true}
            >
                {teamNameInfo()}
                {memberInfo()}
            </ScrollView>
            {createButton()}
        </View>
    )

    function createButton() {
        return (
            <Button
                buttonText='Create'
                onPress={() => { navigation.pop() }}
            />
        )
    }

    function memberInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding * 2.0 }}>
                <Text style={{ ...Fonts.blackColor16Medium }}>
                    Select team member
                </Text>
                <Touchable
                    onPress={() => {
                        navigation.push('InviteMember', { inviteFor: 'team', memberFor: 'team' })
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

    function teamNameInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0 }}>
                <Text style={{ ...Fonts.blackColor16Medium }}>
                    Team name
                </Text>
                <View style={styles.infoBox}>
                    <TextInput
                        value={teamName}
                        onChangeText={setTeamName}
                        placeholder='Enter team name'
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

export default CreateTeamScreen

const styles = StyleSheet.create({
    infoBox: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        ...CommonStyles.shadow,
        padding: Sizes.fixPadding + 2.0,
        marginTop: Sizes.fixPadding,
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
})