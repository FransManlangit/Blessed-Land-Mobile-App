import React, { useState } from "react";
import { View, StyleSheet, Dimensions, ScrollView, Button } from "react-native";
import { Text, HStack, VStack, Avatar, Spacer, Center } from "native-base";

import * as actions from "../../../Redux/Actions/cartActions";
import Toast from "react-native-toast-message";
import axios from 'axios';
import baseURL from "../../../assets/common/baseUrl";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

var { width, height } = Dimensions.get("window");

const Confirm = (props) => {
    const [token, setToken] = useState();
    const finalRequest = props.route.params;
    console.log("request", finalRequest);
    const dispatch = useDispatch();
    let navigation = useNavigation();

    const confirmRequest = () => {
        const request = finalRequest.request.request;
        request.payment = finalRequest.payment;

        AsyncStorage.getItem("jwt")
            .then((res) => {
                setToken(res);
            })
            .catch((error) => console.log(error));
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        axios
            .post(`${baseURL}requests`, request, config)
            .then((res) => {
                if (res.status == 200 || res.status == 201) {
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: "Request Completed",
                        text2: "",
                    });

                    setTimeout(() => {
                        dispatch(actions.clearCart());
                        navigation.navigate("Cart");
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
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                    Confirm Request
                </Text>
                {props.route.params ? (
                    <View style={{ borderWidth: 1, borderColor: "orange" }}>
                        <View style={{ padding: 8 }}>
                            <Text>StudentId: {finalRequest.request.request.studentId}</Text>
                            <Text>Grade: {finalRequest.request.request.grade}</Text>
                            <Text>Section: {finalRequest.request.request.section}</Text>
                            <Text>Fullname: {finalRequest.request.request.fullname}</Text>
                            <Text>Phone: {finalRequest.request.request.phone}</Text>
                            <Text>purpose: {finalRequest.request.request.purpose}</Text>
                            <Text>Total Price: {finalRequest.request.request.totalPrice}</Text>

                        </View>
                        <Text style={styles.title}>items</Text>

                        {finalRequest.request.request.requestItems.map((item) => {
                            return (
                                <HStack
                                    space={[2, 3]}
                                    justifyContent="space-between"
                                    key={item.id}
                                >
                                    <Avatar
                                        size="48px"
                                        source={{
                                            uri: item.image
                                                ? item.image
                                                : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
                                        }}
                                    />
                                    <VStack>
                                        <Text
                                            _dark={{
                                                color: "warmGray.50",
                                            }}
                                            color="coolGray.800"
                                            bold
                                        >
                                            {item.name}
                                        </Text>
                                    </VStack>
                                    <Spacer />
                                    <Text
                                        fontSize="xs"
                                        _dark={{
                                            color: "warmGray.50",
                                        }}
                                        color="coolGray.800"
                                        alignSelf="flex-start"
                                    >
                                        {item.price}
                                    </Text>
                                </HStack>
                            );
                        })}
                    </View>
                ) : null}
                <View style={{ alignItems: "center", margin: 20 }}>
                    <Button title={"Place request"} onPress={confirmRequest} />
                </View>
            </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    container: {
        height: height,
        padding: 8,
        alignContent: "center",
        backgroundColor: "white",
    },
    titleContainer: {
        justifyContent: "center",
        alignItems: "center",
        margin: 8,
    },
    title: {
        alignSelf: "center",
        margin: 8,
        fontSize: 16,
        fontWeight: "bold",
    },
    listItem: {
        alignItems: "center",
        backgroundColor: "white",
        justifyContent: "center",
        width: width / 1.2,
    },
    body: {
        margin: 10,
        alignItems: "center",
        flexDirection: "row",
    },
});
export default Confirm;
