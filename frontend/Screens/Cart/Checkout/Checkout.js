import React, { useEffect, useState, useContext } from "react";
import { Text, View, Button } from "react-native";
import { Select, Item, Picker, Toast, CheckIcon } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import FormContainer from "../../../Shared/Form/FormContainer";
import Input from "../../../Shared/Form/Input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import AuthGlobal from "../../../Context/Store/AuthGlobal";

const Checkout = (props) => {
    const [requestItems, setRequestItems] = useState([]);
    const [fullname, setFullName] = useState([""]);
    const [phone, setPhone] = useState([""]);
    const [purpose, setPurpose] = useState([""]);
    const [studentId, setStudentId] = useState([""]);
    const [grade, setGrade] = useState([""]);
    const [section, setSection] = useState([""]);
    const [user, setUser] = useState("");
    const [totalPrice, setTotalPrice] = useState(0);

    const navigation = useNavigation();
    const cartItems = useSelector((state) => state.cartItems);
    const context = useContext(AuthGlobal);

    useEffect(() => {
        let total = 0;
        cartItems.forEach((item) => {
            total += item.price * item.numofcopies;
        });
        setTotalPrice(total);

        setRequestItems(cartItems);
        if (context.stateUser.isAuthenticated) {
            setUser(context.stateUser.user.userId);
        } else {
            navigation.navigate("User", { screen: "Login" });
            Toast.show({
                topOffset: 60,
                type: "error",
                text1: "Please Login to Checkout",
                text2: "",
            });
        }

        return () => {
            setRequestItems();
        };
    }, [cartItems, context.stateUser.isAuthenticated, navigation]);

    const checkOut = () => {
        let total = 0;
        requestItems.forEach((item) => {
            total += item.price * item.numofcopies;
        });
        console.log("requests", requestItems);
        let request = {
            fullname,
            phone,
            dateofRequest: Date.now(),
            requestItems,
            purpose,
            phone,
            studentId,
            section,
            grade,
            status: "pending",
            user,
            totalPrice: total,
        };
        console.log("details", request);
        navigation.navigate("Payment", { request: request });
    };
    console.log(requestItems);

    return (
        <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            extraHeight={200}
            enableOnAndroid={true}
        >
            <View title={"Student Detail"}>
                <Input
                    placeholder={"StudentId"}
                    name={"studentId"}
                    value={studentId}
                    onChangeText={(text) => setStudentId(text)}
                />
                <Input
                    placeholder={"Grade"}
                    name={"grade"}
                    value={grade}
                    onChangeText={(text) => setGrade(text)}
                />
                <Input
                    placeholder={"Section"}
                    name={"section"}
                    value={section}
                    onChangeText={(text) => setSection(text)}
                />
                <Input
                    placeholder={"Phone"}
                    name={"phone"}
                    value={phone}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setPhone(text)}
                />
                <Input
                    placeholder={"fullname"}
                    name={"fullname"}
                    value={fullname}
                    onChangeText={(text) => setFullName(text)}
                />
                <Input
                    placeholder={"purpose"}
                    name={"purpose"}
                    value={purpose}
                    onChangeText={(text) => setPurpose(text)}
                />

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 20,
                    }}
                >
                    <Text style={{ fontSize: 16 }}>Total Price:</Text>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                        ${totalPrice.toFixed(2)}
                    </Text>
                </View>

                <View style={{ width: "80%", alignItems: "center" }}>
                    <Button title="Confirm" onPress={() => checkOut()} />
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
};

export default Checkout;
