import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SliderBox } from "react-native-image-slider-box";
import { COLORS } from "../assets/constants";

const Carousel = () => {
  const slide = [
    "https://res.cloudinary.com/dn638duad/image/upload/v1698419354/Add_a_subheading_t0jels.png",
    "https://res.cloudinary.com/dn638duad/image/upload/v1698419354/Add_a_subheading_t0jels.png",
    "https://res.cloudinary.com/dn638duad/image/upload/v1698419354/Add_a_subheading_t0jels.png",
  ];

  return (
    <View style={styles.carouselContainer}>
      <SliderBox
        images={slide}
        dotColor={COLORS.brown}
        inactiveDotColor={COLORS.brown}
        ImageComponentStyle={{
          borderRadius: 15,
          width: "90%",
          height: 180,
          marginTop: 15,
        }}
        autoplay
        circleLoop
      />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  carouselContainer: {
    flex: 1,
    alignItems: "center",
  },
});
