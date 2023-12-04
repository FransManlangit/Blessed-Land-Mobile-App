import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';
import { ScrollView } from "react-native-gesture-handler";

const statusCodes = [
  { name: "Pending", code: "3" },
  { name: "Shipped", code: "2" },
  { name: "Delivered", code: "1" },
];

const RequestDetails = ({ route }) => {
  const { request } = route.params;
  const [requestItems, setRequestItems] = useState([]);

  const findStatusName = (statusCode) => {
    const foundStatus = statusCodes.find((status) => status.code === statusCode);
    return foundStatus ? foundStatus.name : "Unknown";
  };

  const formatDate = (dateTime) => {
    const date = new Date(dateTime);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    const fetchRequestItems = async () => {
      try {
        const response = await axios.get(`${baseURL}requests/requestItems/${request.id}`);
        setRequestItems(response.data);
      } catch (error) {
        console.error("Error fetching request items:", error);
      }
    };

    fetchRequestItems();
  }, [request.id]);

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>Request Details</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Request ID:</Text>
        <Text>{request.id}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Student's Name:</Text>
        <Text>{`${request.name}`}</Text>
      </View>
     
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Phone Number:</Text>
        <Text>{request.phone}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Payment Method:</Text>
        <Text>{request.payment}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Status:</Text>
        <Text>{findStatusName(request.status)}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Request Date:</Text>
        <Text>{formatDate(request.dateofRequest)}</Text>
      </View>
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total Price:</Text>
        <Text style={styles.totalLabel2}> PHP: {request.totalPrice}</Text>
      </View>
      <View style={styles.detailsContainer}>
  <Text style={styles.label}>Request Items:</Text>
  <View style={styles.space}>
    {requestItems.map((requestItem) => (
      <View key={requestItem._id} style={styles.requestItemContainer}>
        <View style={styles.bulletItem}>
          <Text style={styles.bulletText}>{'\u2022'}</Text>
          <View style={styles.itemDetails}>
            <Text style={styles.label}>{requestItem.document.name}</Text>
            <Text>Price: {requestItem.document.price} Number of Copies: {requestItem.numofcopies}</Text>
          </View>
        </View>
        <Image
          source={{ uri: requestItem.document.image }}
          style={styles.documentImage}
        />
      </View>
    ))}
  </View>
</View>

    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  detailsContainer: {
    marginBottom: 15,
  },
  label: {
    fontWeight: "bold",
  },
  text: {
    color: "#333", 
  },
  space: {
    marginTop: 10,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  bulletText: {
    fontSize: 40,
    marginRight: 8,
  },
  itemDetails: {
    marginLeft: 5,
  },
  documentImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginLeft: 10,
  },

  totalContainer: {
    marginTop: 1,
    marginBottom: 10,
  },
  totalLabel: {
    fontWeight: "bold",
    color: 'red',
    fontSize: 20
  },
  totalLabel2: {
    fontWeight: "bold",
    color: 'black',
    fontSize: 17
  },
});

export default RequestDetails;
