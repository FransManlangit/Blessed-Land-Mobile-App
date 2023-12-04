import React, { useContext, useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Button,
  Image,
  TextInput,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import AuthGlobal from "../../Context/Store/AuthGlobal";
import { logoutUser } from "../../Context/Actions/Auth.actions";
import { COLORS, SIZES } from "../../assets/constants";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";
import Input from "../../Shared/Form/Input";
import EasyButton from "../../Shared/StyledComponents/EasyButtons";

const UserUpdate = (props) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [mainImage, setMainImage] = useState();
  const [token, setToken] = useState();
  let navigation = useNavigation();

  const [user, setUser] = useState(props.route.params.userProfile);
  console.log(props.route.params)

  const context = useContext(AuthGlobal);

  const updateProfile = () => {
    let formData = new FormData();

    formData.append("name", name);
    formData.append("phone", phone);

    const id = user._id;

    if (mainImage == undefined) {
    } else if (mainImage !== image) {
      const newImageUri = "file:///" + mainImage.split("file:/").join("");

      formData.append("image", {
        uri: newImageUri,
        type: mime.getType(newImageUri),
        name: newImageUri.split("/").pop(),
      });
    }
    console.log(formData, "update user");

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .put(`${baseURL}users/userProfile/${id}`, formData, config)
      .then((res) => {
        console.log("Profile updated successfully");
        navigation.navigate("User Profile");
      })
      .catch((error) => {
        console.log("Error updating profile", error);
      });
  };

  useEffect(() => {
    setName(user.name || "");
    setMainImage(user.image || "");
    setImage(user.image || "");
    setPhone(user.phone || "");

    AsyncStorage.getItem("jwt")
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log(error));

    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, [user]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result.assets);
      setMainImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor={COLORS.gray} />
      
      <Image
        source={require("../../assets/profile-bg.jpg")}
        style={styles.cover}
      />
      <View style={styles.profileContainer}>
      <TouchableOpacity onPress={pickImage} >
        <Image
          source={
            mainImage
              ? { uri: mainImage }
              : require("../../assets/student-icon.jpg")
          }
        //   source={require("../../assets/student-icon.jpg")}
          style={styles.profile}
        />
        </TouchableOpacity>
        <Text>Name</Text>
        <Input
          name={"name"}
          id={"name"}
          value={name}
          onChangeText={(text) => setName(text)}
        ></Input>
        <Text>Phone</Text>
        <Input
          name={"phone"}
          id={"phone"}
          value={phone}
          onChangeText={(text) => setPhone(text)}
        ></Input>
          <TouchableOpacity 
             onPress={() => updateProfile()}
            className="px-10 py-2 bg-yellow-900 rounded-lg mb-3">
                <Text  className="tex-xl font-bold text-white text-center">Edit</Text>
            </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  cover: {
    height: 290,
    width: "100%",
    resizeMode: "cover",
  },
  profileContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: -90,
  },
  profile: {
    height: 155,
    width: 155,
    borderRadius: 999,
    borderColor: COLORS.primary,
    borderWidth: 2,
    resizeMode: "cover",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.yellow,
    marginTop: 10,
    textAlign: "center",
  },
  userImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginVertical: 10,
  },
  userInfoContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  userInfoText: {
    fontSize: 16,
    color: COLORS.gray,
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  editButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 8,
  },
  signOutButton: {
    backgroundColor: COLORS.red,
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  requestContainer: {
    marginVertical: 20,
  },
  requestHeaderText: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.yellow,
    marginBottom: 15,
    textAlign: "center",
  },
  requestsList: {
    backgroundColor: COLORS.lightWhite,
    borderRadius: 10,
    paddingVertical: 10,
  },
  requestItem: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
  },
  requestItemText: {
    fontSize: 16,
    color: COLORS.gray,
  },
  noRequestContainer: {
    alignItems: "center",
    marginTop: 20,
  },
});

export default UserUpdate;
