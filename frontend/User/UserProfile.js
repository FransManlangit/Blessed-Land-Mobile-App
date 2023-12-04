import React, { useContext, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Button,
  Image,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import AuthGlobal from "../../Context/Store/AuthGlobal";
import { logoutUser } from "../../Context/Actions/Auth.actions";
import { COLORS, SIZES } from "../../assets/constants";
import { StatusBar } from "expo-status-bar";

const UserProfile = () => {
  const context = useContext(AuthGlobal);
  const [userProfile, setUserProfile] = useState("");
  const [requests, setRequests] = useState([]);
  const navigation = useNavigation();

  const handleEditPress = () => {
    navigation.navigate("UserUpdate", { userProfile });
  };

  const handleRequestPress = (request) => {
    navigation.navigate("RequestDetails", { request });
  };

  useFocusEffect(
    useCallback(() => {
      if (
        context.stateUser.isAuthenticated === false ||
        context.stateUser.isAuthenticated === null
      ) {
        navigation.navigate("Login");
      }

      AsyncStorage.getItem("jwt")
        .then((res) => {
          axios
            .get(`${baseURL}users/${context.stateUser.user.userId}`, {
              headers: { Authorization: `Bearer ${res}` },
            })
            .then((user) => setUserProfile(user.data))
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));

      axios
        .get(`${baseURL}requests/requestItems/${context.stateUser.user.userId}`)
        .then((res) => setRequests(res.data))
        .catch((error) => console.log(error));

      return () => {
        setUserProfile("");
        setRequests([]);
      };
    }, [context.stateUser.isAuthenticated])
  );

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor={COLORS.gray} />
      <Image
        source={require("../../assets/profile-bg.jpg")}
        style={styles.cover}
      />
      <View style={styles.profileContainer}>
        <Image
          source={
            userProfile.image
              ? { uri: userProfile.image }
              : require("../../assets/student-icon.jpg")
          }
          //   source={require("../../assets/student-icon.jpg")}
          style={styles.profile}
        />
        <Text style={styles.headerText}>
          Hello, {userProfile ? userProfile.name : ""}
        </Text>
        {/* {userProfile && userProfile.image ? (
          <Image source={{ uri: userProfile.image }} style={styles.userImage} />
        ) : null} */}
        <View style={styles.userInfoContainer}>
          <Text style={styles.userInfoText}>
            Email: {userProfile ? userProfile.email : ""}
          </Text>
          {/* <Text style={styles.userInfoText}>
            Phone: {userProfile ? userProfile.phone : ""}
          </Text> */}
          {/* Include additional user information as needed */}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signOutButton}
            onPress={() => [
              AsyncStorage.removeItem("jwt"),
              logoutUser(context.dispatch),
            ]}
          >
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.requestContainer}>
          <Text style={styles.requestHeaderText}>My Requests</Text>
          <View style={styles.requestsList}>
            {requests && requests.length > 0 ? (
              requests.map((request, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.requestItem}
                  onPress={() => handleRequestPress(request)}
                >
                  <Text style={styles.requestItemText}>
                    Request ID: {request.id}
                  </Text>
                  <Text>status: {request.status}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.noRequestContainer}>
                <Text>You have no requests</Text>
              </View>
            )}
          </View>
        </View>
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

export default UserProfile;
