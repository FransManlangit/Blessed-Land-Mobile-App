import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import Requests from "../Screens/Admin/Requests"
import Documents from "../Screens/Admin/Documents"
import DocumentForm from "../Screens/Admin/DocumentForm"
import UserProfile from "../Screens/User/UserProfile"
import Users from '../Screens/Admin/Users'
import UserUpdateStatus from "../Screens/Admin/UserUpdateStatus"



const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Documents"
                component={Documents}
                options={{
                    title: "Documents"
                }}
            />
             <Stack.Screen 
                name="Users"
                component={Users}
                options={{
                    title: "Users",
                }}
            />
              <Stack.Screen 
                name="UserUpdateStatus"
                component={UserUpdateStatus}
                options={{
                    title: "User Update Status",
                }}
            />
            <Stack.Screen name="Requests" component={Requests} />
            <Stack.Screen name="DocumentForm" component={DocumentForm} />
      
            
            
        </Stack.Navigator>
    )
}
export default function AdminNavigator() {
    return <MyStack />
}