import React, { useContext, useState, useEffect  } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Icon from "react-native-vector-icons/FontAwesome";
import AuthGlobal from "../Context/Store/AuthGlobal";
import CartIcon from "../Shared/CartIcon";
import UserNavigator from "./UserNavigator";
import HomeNavigator from "./HomeNavigator";
import CartNavigator from "./CartNavigator";
import AdminNavigator from "./AdminNavigator";
import {Ionicons} from "@expo/vector-icons";
import {COLORS} from "../assets/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import baseURL from "../assets/common/baseUrl"
import { Image } from "react-native";

const Tab = createBottomTabNavigator();

const Main = () => {
  const { stateUser } = useContext(AuthGlobal);
  const [userProfile, setUserProfile] = useState(null);
 
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await AsyncStorage.getItem("jwt");
        if (token && stateUser.isAuthenticated) {
          const response = await axios.get(`${baseURL}users/${stateUser.user.userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUserProfile(response.data);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [stateUser.isAuthenticated, stateUser.user.userId]);

  const renderUserIcon = () => {
    if (userProfile && userProfile.image) {
      return (
        <Image
          source={{ uri: userProfile.image }}
          style={{ width: 30, height: 30, borderRadius: 15 }}
        />
      );
    } else {
      return (
        <Icon
          name="user"
          style={{ position: "relative" }}
          color="#e91e63" // Default icon color if user image is not available
          size={30}
        />
      );
    }
  };

  const isStudentOrAdmin  = stateUser.isAuthenticated && 
  (stateUser.user.role === "student" || stateUser.user.role === "admin");

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#F8DF01",
      }}
      
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => {
            return (
              <Icon
                name="home"
                style={{ position: "relative" }}
                color={color}
                size={30}
              />
            );
          },
        }}
      />

      

      <Tab.Screen
        name="Request"
        component={CartNavigator}
        options={{
          tabBarIcon: ({ color }) => {
            return (
              <Icon
                name="file-text"
                style={{ position: "relative" }}
                color={color}
                size={30}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="User"
        component={UserNavigator}
        options={{ headerShown: false,
          tabBarIcon: ({ color }) => {
            return (
              <Icon
                name="users"
                style={{ position: "relative" }}
                color={color}
                size={30}
              />
            );
          },
        }}
      />

{isStudentOrAdmin && (
        <Tab.Screen
          name="Admin"
          component={AdminNavigator}
          options={{
            
            tabBarIcon: ({ color }) => (
              <Icon
                name="cog"
                style={{ position: "relative" }}
                color={color}
                size={30}
              />
            ),
            headerStyle: {
              height: 30, // Adjust the height of the header as needed
            },
            headerTitleStyle: {
              fontSize: 25, // Adjust the font size of the header title as needed
              marginTop: -40,
            },

          }}
        />
      )}
    </Tab.Navigator>
  );
};

export default Main;
