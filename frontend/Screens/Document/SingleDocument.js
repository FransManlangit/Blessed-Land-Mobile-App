import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, View, Image, StyleSheet } from "react-native";
import {
  Box,
  HStack,
  Container,
  H1,
  Center,
  Heading,
  Button,
} from "native-base";
import Toast from "react-native-toast-message";
import * as actions from "../../Redux/Actions/cartActions";

import { useSelector, useDispatch } from "react-redux";
import EasyButton from "../../Shared/StyledComponents/EasyButtons";
import TrafficLight from "../../Shared/StyledComponents/TrafficLight";
import { COLORS, SIZES } from "../../assets/constants";
import { Ionicons } from "@expo/vector-icons";

const SingleDocument = ({ route, navigation }) => {
  const { name, price, image } = route.params.item;
  const [item, setItem] = useState(route.params.item);
  const [availability, setAvailability] = useState(null);
  const [availabilityText, setAvailabilityText] = useState("");
  const dispatch = useDispatch();
  

  useEffect(() => {
    setAvailabilityText(item.countInStock === 0 ? "Unavailable" : "Available");
    setAvailability(
      item.countInStock === 0 ? (
        <TrafficLight unavailable></TrafficLight>
      ) : (
        <TrafficLight available></TrafficLight>
      )
    );
    return () => {
      setAvailability(null);
      setAvailabilityText("");
    };
  }, [item]);

  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle" size={30} />
        </TouchableOpacity>
      </View>
      <Image
        style={styles.image}
        source={{
          uri: item.image
            ? item.image
            : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
        }}
      />
      <View style={styles.details}>
        <View style={styles.titleRow}>
          <Heading style={styles.contentHeader} size="xl">
            {item.name}
          </Heading>
          <View style={styles.availabilityContainer}>
            <View style={styles.availability}>
              <Text style={{ marginRight: 20 }}>
                Availability: {availabilityText}
              </Text>
              {availability}
            </View>
          </View>

          <View style={styles.priceWrapper}>
            <Text style={styles.price}>${item.price}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => {
          // Pass the entire item to addToCart
          dispatch(actions.addToCart({ ...item, numofcopies: 1 }));
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: `${item.name} added to Request`,
            text2: "Go to your cart to complete the request",
          });
        }}
      >
        <Text style={styles.cartTitle}> Request now </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },

  contentHeader: {
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    textAlignVertical: "center",
  },

  availabilityContainer: {
    marginBottom: 20,
    alignItems: "center",
  },

  availability: {
    flexDirection: "row",
    marginBottom: 10,
  },

  image: {
    aspectRatio: 1,
    resizeMode: "cover",
  },

  addBtn: {
    width: SIZES.width * 0.4,
    backgroundColor: COLORS.yellow,
    padding: SIZES.small,
    borderRadius: SIZES.small,
    marginLeft: 8,
  },

  cartTitle: {
    fontFamily: "semibold",
    fontSize: SIZES.medium,
    color: COLORS.black,
  },

  priceWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: SIZES.small,
  },

  price: {
    fontFamily: "semibold",
    fontSize: SIZES.large,
  },
  addCart: {
    width: 37,
    height: 37,
    borderRadius: 50,
    margin: SIZES.small,
    backgroundColor: COLORS.black,
    alignItems: "center",
    justifyContent: "center",
  },

});

export default SingleDocument;
