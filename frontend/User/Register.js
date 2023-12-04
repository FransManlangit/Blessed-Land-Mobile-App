import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
} from "react-native-reanimated";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import Toast from "react-native-toast-message";

const Register = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const navigation = useNavigation();

  const register = () => {
    if (email === "" || name === "" || phone === "" || password === "") {
      setError("Please fill in the form correctly");
    }

    let user = {
      name: name,
      email: email,
      password: password,
      phone: phone,
      isAdmin: false,
    };

    axios
      .post(`${baseURL}users/register`, user)
      .then((res) => {
        if (res.status == 200) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Registration Succeeded",
            text2: "Please Login into your account",
          });
          setTimeout(() => {
            navigation.navigate("Login");
          }, 500);
        }
      })
      .catch((error) => {
        Toast.show({
          position: "bottom",
          bottomOffset: 20,
          type: "error",
          text1: "Something went wrong",
          text2: "Please try again",
        });
      });
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 0,
      }}
    >
      {/* background image */}
      <Image
        style={{
          height: "100%",
          width: "103%",
          position: "absolute",
          left: "-3%",
          top: 0,
        }}
        source={require("../../assets/background.png")}
      />

      {/*title and form*/}
      <View
        className="h-full w-full flex justify-around pt-52"
        style={{ marginTop: 40 }}
      >
        {/*title*/}
        <View className="flex items-center">
          <Animated.Text
            entering={FadeInUp.duration(1000).springify()}
            className="text-yellow-900 font-bold tracking-wider text-5xl"
          >
            Register
          </Animated.Text>
        </View>

        {/* form */}
        <View
          style={{
            alignItems: "center",
            marginHorizontal: 20,
            marginVertical: 45,
          }}
        >
          <Animated.View
            entering={FadeInDown.delay(200).duration(1000).springify()}
            style={{ marginBottom: 20 }}
            className="bg-black/5 p-4 rounded-2xl w-full"
          >
            <TextInput
              placeholder="Name"
              name={"name"}
              id={"name"}
              onChangeText={(text) => setName(text)}
              placeholderTextColor={"black"}
            />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.duration(400).springify()}
            style={{ marginBottom: 20 }}
            className="bg-black/5 p-4 rounded-2xl w-full"
          >
            <TextInput
              placeholder="Email"
              name={"email"}
              id={"email"}
              onChangeText={(text) => setEmail(text.toLowerCase())}
              placeholderTextColor={"black"}
            />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(600).duration(1000).springify()}
            style={{ marginBottom: 20 }}
            className="bg-black/5 p-4 rounded-2xl w-full"
          >
            <TextInput
              placeholder="Password"
              name={"password"}
              id={"password"}
              placeholderTextColor={"black"}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(800).duration(1000).springify()}
            style={{ marginBottom: 20 }}
            className="bg-black/5 p-4 rounded-2xl w-full"
          >
            <TextInput
              placeholder="Phone Number"
              name={"phone"}
              id={"phone"}
              keyboardType={"numeric"}
              onChangeText={(text) => setPhone(text)}
              placeholderTextColor={"black"}
            />
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(1000).duration(1000).springify()}
            className="w-full"
          >
            <TouchableOpacity
              large
              primary
              onPress={() => register()}
              className="w-full bg-yellow-900 p-3 rouded-2xl mb-3"
            >
              <Text className="tex-xl font-bold text-white text-center">
                Register
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(1000).duration(1000).springify()}
            style={{ flexDirection: "row", justifyContent: "center" }}
          >
            <Text style={{ fontSize: 15, color: "black" }}>
              Already have an Account?
            </Text>
            <TouchableOpacity onPress={() => navigation.push("Login")}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginText: {
    fontSize: 15,
    color: "brown",
    textDecorationLine: "underline",
    marginLeft: 1, // Adjust as needed
  },
});

export default Register;
