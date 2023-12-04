import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker, Select } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import TrafficLight from "./StyledComponents/TrafficLight";
import EasyButton from "./StyledComponents/EasyButtons";
import Toast from "react-native-toast-message";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import baseURL from "../assets/common/baseUrl";
import { useNavigation } from "@react-navigation/native";

// Define status codes
const codes = [
  { name: "pending", code: "pending" },
  { name: "processing", code: "processing" },
  { name: "received", code: "received" }, // Corrected spelling
];

const RequestCard = ({ item }) => {
  const [requestStatus, setRequestStatus] = useState();
  const [statusText, setStatusText] = useState();
  const [statusChange, setStatusChange] = useState();
  const [token, setToken] = useState();
  const [cardColor, setCardColor] = useState();
  const navigation = useNavigation();

  // Function to update the request
  const updateRequest = () => {
    // Retrieve token using async storage
    AsyncStorage.getItem("jwt")
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log(error));

    // Define request configuration
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Prepare request data
    const request = {
      fullname: item.fullname,
      studentId: item.studentId, // Corrected spelling
      section: item.section,
      grade: item.grade,
      dateofRequest: item.dateofRequest,
      id: item.id,
      requestItems: item.requestItems,
      phone: item.phone,
      status: statusChange,
      totalPrice: item.totalPrice,
      user: item.user,
      purpose: item.purpose,
    };

    // Make the PUT request
    axios
      .put(`${baseURL}requests/${item.id}`, request, config)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Request Edited",
            text2: "",
          });
          setTimeout(() => {
            navigation.navigate("Requests");
          }, 500);
        }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Something went wrong",
          text2: "Please try again",
        });
      });
  };

  useEffect(() => {
    // Set request status and card color based on item status
    if (item.status === "pending") {
      setRequestStatus(<TrafficLight pending />);
      setStatusText("pending");
      setCardColor("#E74C3C");
    } else if (item.status === "processing") {
      setRequestStatus(<TrafficLight processing />);
      setStatusText("processing");
      setCardColor("#F1C40F");
    } else if (item.status === "received") {
      setRequestStatus(<TrafficLight received />);
      setStatusText("received");
      setCardColor("#2ECC71");
    }

    // Cleanup function
    return () => {
      setRequestStatus(null);
      setStatusText(null);
      setCardColor(null);
    };
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: cardColor }]}>
      <View style={styles.container}>
        <Text>Request Number: #{item.id}</Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <Text>
          Status: {statusText} {requestStatus}
        </Text>
        <Text>Fullname: {item.fullname}</Text>
        <Text>Date of Request: {item.dateofRequest.split("T")[0]}</Text>
        <Text style={styles.price}>Total Price = {item.totalPrice}</Text>
        
        <View>
          <Select
            width="80%"
            iosIcon={<Icon name="arrow-down" color={"#007aff"} />}
            style={{ width: undefined }}
            selectedValue={statusChange}
            color="black"
            placeholder="Change Status"
            placeholderTextColor="gray"
            placeholderStyle={{ color: "#58595B" }}
            placeholderIconColor="#007aff"
            onValueChange={(e) => setStatusChange(e)}
          >
            {codes.map((c) => (
              <Select.Item key={c.code} label={c.name} value={c.code} />
            ))}
          </Select>

          <EasyButton secondary large onPress={() => updateRequest()}>
            <Text style={{ color: "white" }}>Update</Text>
          </EasyButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  priceContainer: {
    marginTop: 10,
    alignSelf: "flex-end",
    flexDirection: "row",
  },
  price: {
    color: "black",
    fontWeight: "bold",
  },
});

export default RequestCard;
