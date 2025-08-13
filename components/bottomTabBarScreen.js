import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Colors, Fonts, Sizes, CommonStyles } from "../constants/styles";
import { View, StyleSheet, Text, BackHandler, Platform,  StatusBar } from "react-native";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import ProfileScreen from "../screens/profile/profileScreen";
import TaskScreen from "../screens/task/taskScreen";
import ProjectScreen from "../screens/project/projectScreen";
import { ExitToast } from "./exitToast";
import MessageScreen from "../screens/message/messageScreen";

const Tab = createBottomTabNavigator();

const BottomTabBarScreen = ({ navigation }) => {
    const backAction = () => {
        if (Platform.OS === "ios") {
            navigation.addListener("beforeRemove", (e) => {
                e.preventDefault();
            });
        } else {
            backClickCount == 1 ? BackHandler.exitApp() : _spring();
            return true;
        }
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

    const [backClickCount, setBackClickCount] = useState(0);

    return (
        <View style={{ flex: 1 }}>
            <StatusBar translucent backgroundColor={'transparent'} barStyle={'light-content'} />
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: Colors.primaryColor,
                    tabBarInactiveTintColor: Colors.grayColor,
                    tabBarHideOnKeyboard: true,
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: styles.tabBarStyle,
                    tabBarItemStyle: Platform.OS == 'ios' ? styles.tabBarItemStyle : null,
                }}
            >
                <Tab.Screen
                    name="Task"
                    component={TaskScreen}
                    options={{
                        tabBarIcon: ({ focused, color }) =>
                            tabSort({
                                focused,
                                color,
                                icon: "list-outline",
                                tab: "Task",
                            }),
                    }}
                />
                <Tab.Screen
                    name="Project"
                    component={ProjectScreen}
                    options={{
                        tabBarIcon: ({ focused, color }) =>
                            tabSort({
                                focused,
                                color,
                                icon: "document-outline",
                                tab: "Project",
                            }),
                    }}
                />
                <Tab.Screen
                    name="Message"
                    component={MessageScreen}
                    options={{
                        tabBarIcon: ({ focused, color }) =>
                            tabSort({
                                focused,
                                color,
                                icon: "chatbox-ellipses-outline",
                                tab: "Message",
                            }),
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        tabBarIcon: ({ focused, color }) =>
                            tabSort({
                                focused,
                                color,
                                icon: "person-outline",
                                tab: "Profile",
                            }),
                    }}
                />
            </Tab.Navigator>
            {backClickCount == 1 ? <ExitToast /> : null}
        </View>
    );

    function tabSort({ focused, color, icon, tab, }) {
        return (
            <View style={{ alignItems: "center" }}>
                <Ionicons
                    name={icon}
                    size={24}
                    color={color}
                    style={{ marginBottom: Sizes.fixPadding - 7.0 }}
                />
                <Text
                    style={
                        focused
                            ? { ...Fonts.primaryColor16Medium }
                            : { ...Fonts.lightGrayColor16Medium }
                    }
                >
                    {tab}
                </Text>
            </View>
        );
    }
};

export default BottomTabBarScreen;

const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: Colors.whiteColor,
        height: 75.0,
        ...Platform.OS == 'ios' ? CommonStyles.shadow : null,
        borderTopColor: '#ececec',
        borderTopWidth: Platform.OS == 'ios' ? 0 : 2.0,
        elevation: 20,
    },
    tabBarItemStyle: {
        height: 75.0,
    }
});
