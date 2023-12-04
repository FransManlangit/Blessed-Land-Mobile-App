import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
  Button,
  TouchableOpacity,
} from 'react-native';
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../Redux/Actions/cartActions";
import { COLORS, SIZES } from "../../assets/constants";


var { width } = Dimensions.get("window");

const DocumentCard = (props) => {
  const { name, price, image } = props;
  const dispatch = useDispatch();
 

  return (
   
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: image
                ? image
                : "https://res.cloudinary.com/dn638duad/image/upload/v1698419194/Beige_and_Charcoal_Modern_Travel_Itinerary_A4_Document_v9fz8j.png",
            }}
          />
        </View>
        <View style={styles.card}>
          <Text style={styles.title} numberOfLines={1}>
            {name.length > 15 ? name.substring(0, 15 - 3) + "..." : name}
          </Text>
          <Text style={styles.price}>${price}</Text>
        </View>
        <TouchableOpacity style={styles.addBtn}>
          <Ionicons
            onPress={() => {
              dispatch(actions.addToCart({ ...props, numofcopies: 1 })),
                Toast.show({
                  topOffset: 60,
                  type: "success",
                  text1: `${name} added to Request`,
                  text2: "Go to your cart to complete request",
                });
            }}
            name="push-outline"
            size={35}
            color={COLORS.brown}
          />
      
        </TouchableOpacity>
      </View>

  );
};

const styles = StyleSheet.create({
  container: {
    width: width / 2 - 20,
    height: width / 1.7,
    padding: 10,
    borderRadius: 20,
    marginTop: 35,
    marginBottom: 5,
    marginLeft: 10,
    alignItems: 'center',
    backgroundColor: COLORS.yellow,
  
  },

  imageContainer: {
    width: '100%', 
    aspectRatio: 1, 
    borderRadius: SIZES.medium,
    overflow: "hidden",
    backgroundColor: COLORS.gray2,
  
  },

  image: {
    width: '100%', 
    height: '100%', 
    resizeMode: "cover",
  },

  card: {
    padding: SIZES.small,
  },

  title: {
    fontWeight: "regular",
    fontSize: SIZES.medium,
    marginBottom: -3,
    marginLeft: -45,
  },


  price: {
    fontWeight: "bold",
    fontSize: SIZES.small,
    marginLeft: -45,
  },

  addBtn: {
    position: "absolute",
    bottom: SIZES.xSmall,
    right: SIZES.xSmall,
    marginRight: -8,
  },
});

export default DocumentCard;
