import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import DocumentContainer from '../Screens/Document/DocumentContainer'
import SingleDocument from '../Screens/Document/SingleDocument'


const Stack = createStackNavigator()
function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Home'
                component={DocumentContainer}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name='Document Detail'
                component={SingleDocument}
                options={{
                    headerShown: false,
                }}
            />

        </Stack.Navigator>
    )

}

export default function HomeNavigator() {
    return <MyStack />;
}
