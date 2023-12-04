import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import UserUpdate from "../Screens/User/UserUpdate";
import RequestDetails from "../Screens/User/RequestDetails"
import Login from "../Screens/User/Login";
import Register from "../Screens/User/Register";
import UserProfile from "../Screens/User/UserProfile";

const Stack = createStackNavigator();

const UserNavigator = (props) => {

    return (
        <Stack.Navigator>
            <Stack.Screen
            name="Login"
            component={Login}
            options={{
                headerShown: false
            }}
            />


            <Stack.Screen
            name="Register"
            component={Register}
            options={{
                headerShown: false
            }}
            />

           <Stack.Screen
            name="User Profile"
            component={UserProfile}
            options={{
                headerShown: false
            }}
            />

            <Stack.Screen
            name="UserUpdate"
            component={UserUpdate}
            options={{
                headerShown: false
            }}
            />

            <Stack.Screen
            name="RequestDetails"
            component={RequestDetails}
            options={{
                headerShown: false
            }}
            />

        </Stack.Navigator>
    )
}

export default UserNavigator;
