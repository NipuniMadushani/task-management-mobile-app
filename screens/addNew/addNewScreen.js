import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  View,
  Image,
  Alert,
} from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import Header from "../../components/header";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Touchable } from "../../components/touchable";
import { Menu, MenuItem } from "react-native-material-menu";
import { Button } from "../../components/button";
import { Calendar } from "react-native-calendars";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import * as WebBrowser from "expo-web-browser";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
const teamsList = [
  "Designer team",
  "Developer team",
  "HR team",
  "Marketing team",
  "Management team",
];

const AddNewScreen = ({ navigation, route }) => {
  const from = route.params.from;
  const todayDate = new Date().toLocaleDateString();

  const [taskName, setTaskName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [startingDate, setStartingDate] = useState("");
  const [endingDate, setEndingDate] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [defaultDate, setDefaultDate] = useState(new Date().getDate());
  const [dateSelectionFor, setDateSelectionFor] = useState("");
  const [showAttachmentSheet, setShowAttachmentSheet] = useState(false);
  const [attachments, setAttachments] = useState([]);

  // Function to download file
  const handleDownload = async (file) => {
    try {
      // Request permission
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permission required to save files to gallery.");
        return;
      }

      // For images, save directly
      if (file.type.includes("image")) {
        const asset = await MediaLibrary.createAssetAsync(file.uri);
        await MediaLibrary.createAlbumAsync("MyApp", asset, false);
        alert("Image saved to gallery!");
      } else {
        // For PDFs/Docs, first copy to FileSystem.documentDirectory
        const fileUri = FileSystem.documentDirectory + file.name;
        await FileSystem.copyAsync({ from: file.uri, to: fileUri });

        const asset = await MediaLibrary.createAssetAsync(fileUri);
        await MediaLibrary.createAlbumAsync("MyApp", asset, false);
        alert("File saved to gallery!");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to save file to gallery.");
    }
  };

  // Function to share file
  const handleShare = async (file) => {
    try {
      const fileUri = FileSystem.documentDirectory + file.name;
      console.warn(fileUri);
      // Ensure file is stored locally before sharing
      await FileSystem.downloadAsync(file.uri, fileUri);

      if (!(await Sharing.isAvailableAsync())) {
        alert("Sharing is not available on this device");
        return;
      }
      await Sharing.shareAsync(fileUri);
    } catch (error) {
      console.error("Share error:", error);
      alert("Failed to share file");
    }
  };

  useEffect(() => {
    if (route.params?.members) {
      setSelectedMembers(route.params.members);
    }
  }, [route.params?.members]);

  // Camera
  const openCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Permission required",
        "Camera access is needed to take pictures."
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const file = {
        name: result.assets[0].uri.split("/").pop(),
        uri: result.assets[0].uri,
        type: "image",
      };
      setAttachments((prev) => [...prev, file]);
    }
  };

  // Gallery
  const openGallery = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Permission required",
        "Gallery access is needed to select images."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const file = {
        name: result.assets[0].uri.split("/").pop(),
        uri: result.assets[0].uri,
        type: "image",
      };
      setAttachments((prev) => [...prev, file]);
    }
  };

  // Document Picker
  const openDocumentPicker = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "image/*",
      ],
      copyToCacheDirectory: true,
    });
    console.warn(result.assets[0].mimeType);
    // if (result.type === "success") {
    const file = {
      name: result.assets[0].name,
      uri: result.assets[0].uri,
      type: result.assets[0].mimeType,
    };
    setAttachments((prev) => [...prev, file]);
    // }
  };

  // ---------- UI Components ----------

  const attachmentSheet = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showAttachmentSheet}
      onRequestClose={() => setShowAttachmentSheet(false)}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setShowAttachmentSheet(false)}
        style={styles.modalBackground}
      >
        <View style={{ justifyContent: "flex-end", flex: 1 }}>
          <TouchableOpacity activeOpacity={1} style={styles.sheetWrapStyle}>
            <Text style={Fonts.blackColor16SemiBold}>Choose attachment</Text>

            {optionSort({
              iconName: "camera",
              color: Colors.darkBlueColor,
              option: "Camera",
              onPress: () => {
                setShowAttachmentSheet(false);
                setTimeout(openCamera, 300);
              },
            })}
            {optionSort({
              iconName: "image",
              color: Colors.darkGreenColor,
              option: "Gallery",
              onPress: () => {
                setShowAttachmentSheet(false);
                setTimeout(openGallery, 300);
              },
            })}
            {optionSort({
              iconName: "folder",
              color: Colors.darkOrangeColor,
              option: "Files",
              onPress: () => {
                setShowAttachmentSheet(false);
                setTimeout(openDocumentPicker, 300);
              },
            })}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
  // const attachmentsDisplay = () =>
  //   attachments.length > 0 && (
  //     <View
  //       style={{
  //         marginHorizontal: Sizes.fixPadding * 2,
  //         marginBottom: Sizes.fixPadding * 2,
  //       }}
  //     >
  //       <Text style={Fonts.blackColor16Medium}>Selected Files</Text>

  //       {attachments.map((file, index) => {
  //         // Get lowercase name for easy matching
  //         const fileName = file.name?.toLowerCase() || "";
  //         const mimeType = file.type?.toLowerCase() || "";

  //         const isImage =
  //           mimeType.includes("image") ||
  //           fileName.endsWith(".jpg") ||
  //           fileName.endsWith(".jpeg") ||
  //           fileName.endsWith(".png") ||
  //           fileName.endsWith(".gif") ||
  //           fileName.endsWith(".webp");

  //           console.warn("mimType:"+mimeType)

  //         const isPDF = mimeType.includes("pdf") || fileName.endsWith(".pdf");
  //         const isWord =
  //           mimeType.includes("word") ||
  //           fileName.endsWith(".doc") ||
  //           fileName.endsWith(".docx");
  //         const isExcel =
  //           mimeType.includes("excel") ||
  //           fileName.endsWith(".xls") ||
  //           fileName.endsWith(".xlsx");

  //         return (
  //           // <View key={index} style={styles.attachmentRow}>
  //           //   {isImage ? (
  //           //     <Image
  //           //       source={{ uri: file.uri }}
  //           //       style={{
  //           //         width: 40,
  //           //         height: 40,
  //           //         borderRadius: 4,
  //           //         marginRight: Sizes.fixPadding,
  //           //       }}
  //           //     />
  //           //   ) : (
  //           //     <MaterialIcons
  //           //       name={
  //           //         isPDF
  //           //           ? "picture-as-pdf"
  //           //           : isWord
  //           //           ? "article"
  //           //           : isExcel
  //           //           ? "grid-on"
  //           //           : "insert-drive-file"
  //           //       }
  //           //       size={24}
  //           //       color={Colors.primaryColor}
  //           //       style={{ marginRight: Sizes.fixPadding }}
  //           //     />
  //           //   )}

  //           //   <Text
  //           //     style={{ ...Fonts.blackColor15Medium, flex: 1 }}
  //           //     numberOfLines={1}
  //           //   >
  //           //     {file.name}
  //           //   </Text>
  //           // </View>
  //           <View key={index} style={styles.attachmentRow}>
  //             <TouchableOpacity
  //               style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
  //               onPress={() => WebBrowser.openBrowserAsync(file.uri)}
  //             >
  //               {isImage ? (
  //                 <Image
  //                   source={{ uri: file.uri }}
  //                   style={{
  //                     width: 40,
  //                     height: 40,
  //                     borderRadius: 4,
  //                     marginRight: Sizes.fixPadding,
  //                   }}
  //                 />
  //               ) : (
  //                 <MaterialIcons
  //                   name={
  //                     isPDF
  //                       ? "picture-as-pdf"
  //                       : isWord
  //                       ? "article"
  //                       : isExcel
  //                       ? "grid-on"
  //                       : "insert-drive-file"
  //                   }
  //                   size={24}
  //                   color={Colors.primaryColor}
  //                   style={{ marginRight: Sizes.fixPadding }}
  //                 />
  //               )}

  //               <Text
  //                 style={{ ...Fonts.blackColor15Medium, flex: 1 }}
  //                 numberOfLines={1}
  //               >
  //                 {file.name}
  //               </Text>
  //             </TouchableOpacity>
  //           </View>
  //         );
  //       })}
  //     </View>
  //   );
  const attachmentsDisplay = () =>
    attachments.length > 0 && (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2,
          marginBottom: Sizes.fixPadding * 2,
        }}
      >
        <Text style={Fonts.blackColor16Medium}>Selected Files</Text>

        {attachments.map((file, index) => {
          const fileName = file.name?.toLowerCase() || "";
          const mimeType = file.type?.toLowerCase() || "";

          const isImage =
            mimeType.includes("image") ||
            fileName.endsWith(".jpg") ||
            fileName.endsWith(".jpeg") ||
            fileName.endsWith(".png") ||
            fileName.endsWith(".gif") ||
            fileName.endsWith(".webp");

          const isPDF = mimeType.includes("pdf") || fileName.endsWith(".pdf");
          const isWord =
            mimeType.includes("word") ||
            fileName.endsWith(".doc") ||
            fileName.endsWith(".docx");
          const isExcel =
            mimeType.includes("excel") ||
            fileName.endsWith(".xls") ||
            fileName.endsWith(".xlsx");

          return (
            <View key={index} style={styles.attachmentRow}>
              {/* Open file on tap */}
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
                onPress={() => WebBrowser.openBrowserAsync(file.uri)}
              >
                {isImage ? (
                  <Image
                    source={{ uri: file.uri }}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 4,
                      marginRight: Sizes.fixPadding,
                    }}
                  />
                ) : (
                  <MaterialIcons
                    name={
                      isPDF
                        ? "picture-as-pdf"
                        : isWord
                        ? "article"
                        : isExcel
                        ? "grid-on"
                        : "insert-drive-file"
                    }
                    size={24}
                    color={Colors.primaryColor}
                    style={{ marginRight: Sizes.fixPadding }}
                  />
                )}

                <Text
                  style={{ ...Fonts.blackColor15Medium, flex: 1 }}
                  numberOfLines={1}
                >
                  {file.name}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setAttachments((prev) => prev.filter((_, i) => i !== index));
                }}
                style={{ marginLeft: Sizes.fixPadding }}
              >
                <MaterialIcons name="close" size={24} color="green" />
              </TouchableOpacity>
              {/* Download Button */}
              {/* <TouchableOpacity onPress={() => handleDownload(file)}>
                <MaterialIcons name="file-download" size={24} color="green" />
              </TouchableOpacity> */}

              {/* Share Button */}
              {/* <TouchableOpacity onPress={() => handleShare(file)}>
                <MaterialIcons name="share" size={24} color="blue" />
              </TouchableOpacity> */}
            </View>
          );
        })}
      </View>
    );
  const optionSort = ({ iconName, color, option, onPress }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.optionRow}
    >
      <View style={styles.optionCircle}>
        <Ionicons name={iconName} color={color} size={22} />
      </View>
      <Text
        style={{
          ...Fonts.blackColor16Medium,
          flex: 1,
          marginLeft: Sizes.fixPadding + 5,
        }}
        numberOfLines={1}
      >
        {option}
      </Text>
    </TouchableOpacity>
  );

  const calendarDialog = () => (
    <Modal
      animationType="slide"
      transparent
      visible={showCalendar}
      onRequestClose={() => setShowCalendar(false)}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setShowCalendar(false)}
        style={styles.modalBackground}
      >
        <View style={{ justifyContent: "center", flex: 1 }}>
          <TouchableOpacity activeOpacity={1} style={styles.dialogStyle}>
            <Calendar
              monthFormat="MMMM yyyy"
              renderArrow={(direction) =>
                direction === "left" ? (
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
              hideExtraDays
              disableMonthChange
              firstDay={1}
              onPressArrowLeft={(subtractMonth) => subtractMonth()}
              onPressArrowRight={(addMonth) => addMonth()}
              enableSwipeMonths
              dayComponent={({ date }) => (
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    setSelectedDate(`${date.day}/${date.month}/${date.year}`);
                    setDefaultDate(date.day);
                  }}
                  style={{
                    ...styles.calenderDateWrapStyle,
                    backgroundColor:
                      date.day === defaultDate
                        ? Colors.primaryColor
                        : Colors.whiteColor,
                  }}
                >
                  <Text
                    style={
                      date.day === defaultDate
                        ? Fonts.whiteColor16SemiBold
                        : Fonts.blackColor16Medium
                    }
                  >
                    {date.day}
                  </Text>
                </TouchableOpacity>
              )}
              theme={{
                calendarBackground: Colors.whiteColor,
                textSectionTitleColor: Colors.grayColor,
                monthTextColor: Colors.blackColor,
                textMonthFontFamily: "Poppins-SemiBold",
                textDayHeaderFontFamily: "Poppins-SemiBold",
                textMonthFontSize: 16,
                textDayHeaderFontSize: 12,
              }}
            />

            <View style={styles.dialogButtonWrapper}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setShowCalendar(false)}
                style={{
                  ...styles.dialogButtonStyle,
                  backgroundColor: Colors.whiteColor,
                  marginRight: Sizes.fixPadding * 1.5,
                }}
              >
                <Text style={Fonts.blackColor16SemiBold}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  dateSelectionFor === "start"
                    ? setStartingDate(selectedDate || todayDate)
                    : setEndingDate(selectedDate || todayDate);
                  setShowCalendar(false);
                }}
                style={{
                  ...styles.dialogButtonStyle,
                  backgroundColor: Colors.primaryColor,
                }}
              >
                <Text style={Fonts.whiteColor16SemiBold}>Ok</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );

  const addButton = () => (
    <Button
      buttonText={from === "task" ? "Add task" : "Add project"}
      onPress={() => navigation.pop()}
    />
  );

  // ---------- Form Fields ----------
  const taskNameInfo = () => (
    <View style={{ margin: Sizes.fixPadding * 2 }}>
      <Text style={Fonts.blackColor16Medium}>Task name</Text>
      <View style={styles.infoBox}>
        <TextInput
          value={taskName}
          onChangeText={setTaskName}
          placeholder="Enter task name"
          placeholderTextColor={Colors.grayColor}
          style={{ ...Fonts.blackColor15Medium, padding: 0 }}
          cursorColor={Colors.primaryColor}
          selectionColor={Colors.primaryColor}
        />
      </View>
    </View>
  );

  const projectNameInfo = () => (
    <View
      style={{
        marginHorizontal: Sizes.fixPadding * 2,
        marginTop: from === "task" ? 0 : Sizes.fixPadding * 2,
      }}
    >
      <Text style={Fonts.blackColor16Medium}>Project name</Text>
      <View style={styles.infoBox}>
        <TextInput
          value={projectName}
          onChangeText={setProjectName}
          placeholder="Enter project name"
          placeholderTextColor={Colors.grayColor}
          style={{ ...Fonts.blackColor15Medium, padding: 0 }}
          cursorColor={Colors.primaryColor}
          selectionColor={Colors.primaryColor}
        />
      </View>
    </View>
  );

  const startingDateInfo = () => (
    <View style={{ margin: Sizes.fixPadding * 2 }}>
      <Text style={Fonts.blackColor16Medium}>Starting date</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setDateSelectionFor("start");
          setShowCalendar(true);
        }}
        style={{ ...styles.infoBox, paddingVertical: Sizes.fixPadding + 3 }}
      >
        <Text
          style={
            startingDate ? Fonts.blackColor15Medium : Fonts.grayColor15Medium
          }
        >
          {startingDate || "Enter starting date"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const endingDateInfo = () => (
    <View
      style={{
        marginHorizontal: Sizes.fixPadding * 2,
        marginTop: from === "task" ? 0 : Sizes.fixPadding * 2,
      }}
    >
      <Text style={Fonts.blackColor16Medium}>Ending date</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setDateSelectionFor("end");
          setShowCalendar(true);
        }}
        style={{ ...styles.infoBox, paddingVertical: Sizes.fixPadding + 3 }}
      >
        <Text
          style={
            endingDate ? Fonts.blackColor15Medium : Fonts.grayColor15Medium
          }
        >
          {endingDate || "Enter ending date"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const attachmentInfo = () => (
    <View style={{ margin: Sizes.fixPadding * 2 }}>
      <Text style={Fonts.blackColor16Medium}>Attachment</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setShowAttachmentSheet(true)}
        style={{ ...styles.infoBox, ...CommonStyles.rowAlignCenter }}
      >
        <View style={styles.attachmentIconWrapper}>
          <MaterialIcons
            name="attach-file"
            size={18}
            color={Colors.primaryColor}
            style={{ transform: [{ rotate: "50deg" }] }}
          />
        </View>
        <Text
          style={{
            ...Fonts.grayColor15Medium,
            flex: 1,
            marginLeft: Sizes.fixPadding,
          }}
          numberOfLines={1}
        >
          Attach file
        </Text>
      </TouchableOpacity>
    </View>
  );

  const teamInfo = () => (
    <View style={{ marginHorizontal: Sizes.fixPadding * 2 }}>
      <Text style={Fonts.blackColor16Medium}>Select team</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setShowMenu(true)}
        style={{ ...styles.infoBox, ...CommonStyles.rowAlignCenter }}
      >
        <Text
          style={{
            ...(selectedTeam
              ? Fonts.blackColor15Medium
              : Fonts.grayColor15Medium),
            flex: 1,
          }}
          numberOfLines={1}
        >
          {selectedTeam || "Select team"}
        </Text>
        <Menu
          visible={showMenu}
          anchor={
            <Ionicons name="chevron-down" color={Colors.grayColor} size={20} />
          }
          onRequestClose={() => setShowMenu(false)}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            {teamsList.map((option, index) => (
              <MenuItem
                key={index}
                onPress={() => {
                  setSelectedTeam(option);
                  setShowMenu(false);
                }}
              >
                <Text style={Fonts.blackColor16Medium}>{option}</Text>
              </MenuItem>
            ))}
          </ScrollView>
        </Menu>
      </TouchableOpacity>
    </View>
  );

  const memberInfo = () => (
    <View style={{ margin: Sizes.fixPadding * 2 }}>
      <Text style={Fonts.blackColor16Medium}>Select team member</Text>
      <Touchable
        onPress={() =>
          navigation.push("InviteMember", { inviteFor: "addTask" })
        }
        style={{ ...styles.infoBox, ...CommonStyles.rowAlignCenter }}
      >
        {selectedMembers.length === 0 ? (
          <Text style={{ ...Fonts.grayColor15Medium, flex: 1 }}>
            Select member
          </Text>
        ) : (
          <View style={{ ...CommonStyles.rowAlignCenter, flex: 1 }}>
            {selectedMembers.slice(0, 4).map((item, index) => (
              <Image
                key={index}
                source={item.image}
                style={{ ...styles.selectedMemberStyle, left: -(index * 6) }}
              />
            ))}
            {selectedMembers.length > 4 && (
              <View
                style={{
                  ...styles.selectedMemberStyle,
                  ...CommonStyles.center,
                  left: -25,
                }}
              >
                <Text style={Fonts.blackColor12SemiBold}>
                  +{selectedMembers.length - 4}
                </Text>
              </View>
            )}
          </View>
        )}
        <View style={styles.addIconOuterCircle}>
          <View style={styles.addIconInnerCircle}>
            <MaterialIcons name="add" color={Colors.whiteColor} size={12} />
          </View>
        </View>
      </Touchable>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <Header
        header={from === "task" ? "Add new task" : "Add new project"}
        navigation={navigation}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets
      >
        {from === "task" && taskNameInfo()}
        {projectNameInfo()}
        {startingDateInfo()}
        {endingDateInfo()}
        {attachmentInfo()}
        {attachmentsDisplay()}
        {teamInfo()}
        {memberInfo()}
      </ScrollView>
      {addButton()}
      {calendarDialog()}
      {attachmentSheet()}
    </View>
  );
};

export default AddNewScreen;

// ---------- Styles ----------
const styles = StyleSheet.create({
  infoBox: {
    borderWidth: 1,
    borderColor: Colors.grayColor,
    borderRadius: Sizes.fixPadding,
    padding: Sizes.fixPadding,
    marginTop: Sizes.fixPadding,
  },
  sheetWrapStyle: {
    backgroundColor: Colors.whiteColor,
    padding: Sizes.fixPadding * 2,
    borderTopRightRadius: Sizes.fixPadding,
    borderTopLeftRadius: Sizes.fixPadding,
  },
  optionCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    ...CommonStyles.center,
    backgroundColor: Colors.lightGrayColor,
  },
  optionRow: {
    ...CommonStyles.rowAlignCenter,
    marginTop: Sizes.fixPadding * 2,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  dialogStyle: {
    marginHorizontal: Sizes.fixPadding * 2,
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding,
    padding: Sizes.fixPadding * 2,
  },
  dialogButtonWrapper: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: Sizes.fixPadding * 2,
  },
  dialogButtonStyle: {
    paddingVertical: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding * 2,
    borderRadius: Sizes.fixPadding,
  },
  calenderDateWrapStyle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    ...CommonStyles.center,
  },
  attachmentRow: {
    ...CommonStyles.rowAlignCenter,
    marginTop: Sizes.fixPadding,
    backgroundColor: Colors.whiteColor,
    padding: Sizes.fixPadding,
    borderRadius: Sizes.fixPadding,
    ...CommonStyles.shadow,
  },
  attachmentIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.lightGrayColor,
    ...CommonStyles.center,
  },
  selectedMemberStyle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.whiteColor,
  },
  addIconOuterCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primaryColor,
    ...CommonStyles.center,
  },
  addIconInnerCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.primaryColor,
    ...CommonStyles.center,
  },
});
