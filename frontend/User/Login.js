
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet  } from 'react-native'
import React, {useState, useContext, useEffect} from "react";
import AuthGlobal from '../../Context/Store/AuthGlobal';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Error from '../../Shared/Error';
import { loginUser } from '../../Context/Actions/Auth.actions';
import { StatusBar } from 'expo-status-bar'
import Animated, { FadeIn, FadeInDown, FadeInUp, FadeOut } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


const Login = (props) => {
const context = useContext(AuthGlobal)

const[email, setEmail] = useState('')
const[password, setPassword] = useState('')
const[error, setError] = useState("")

let navigation = useNavigation()

const login = () => {
   const user = {
    email,
    password,
   };

   if (email === "" || password === "") {
    setError("Please fill in your credentials");
   } else {
    loginUser(user, context.dispatch);
    console.log("error")
   }
}

useEffect(() => {
    if (context.stateUser.isAuthenticated === true) {
        navigation.navigate("User Profile");
    }
},[context.stateUser.isAuthenticated]);


AsyncStorage.getAllKeys((err, keys) => {
  AsyncStorage.multiGet(keys, (error, stores) => {
      stores.map((result, i, store) => {
          console.log({ [store[i][0]]: store[i][1] });
          return true;
      });
  });
});


  return (
  

    <View className=" flex-1 justify-center bg-white h-full w-full">
        <StatusBar style="light"/>
        <Image className="h-full w-full absolute" source={require('../../assets/background.png')}/>
      
      {/*title and form*/}
     <View className="h-full w-full flex justify-around pt-48">
        {/*title*/}
     <View className="flex items-center">
             <Animated.Text entering={FadeInUp.duration(1000).springify()} className="text-yellow-900 font-bold tracking-wider text-6xl">
                Login
            </Animated.Text>
        </View>

        {/*form*/}
      <View className="flex items-center mx-4 space-y-4">
        <Animated.View entering={FadeInDown.duration(1000).springify()} className="bg-black/5 p-5 rounded-2xl w-full">
            <TextInput placeholder='Enter Email' 
               name={"email"}
                id={"email"}
                value={email}
                onChangeText={(text) => setEmail(text.toLowerCase())}
            placeholderTextColor={'black'}/>
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className="bg-black/5 p-5 rounded-2xl w-full">
            <TextInput placeholder='Enter Password' name={"password"} id={"password"} value={password}
             onChangeText={(text) => setPassword(text)}
            placeholderTextColor={'black'} secureTextEntry={true}/>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(500).duration(1000).springify()} className="w-full">
            <TouchableOpacity 
             onPress={() => login()}
            className="w-full bg-yellow-900 p-3 rouded-2xl mb-3">
                <Text  className="tex-xl font-bold text-white text-center">Login</Text>
            </TouchableOpacity>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(700).duration(1000).springify()} className="flex-row justify-center">
            <Text>Don't have an Account?</Text>
            <TouchableOpacity onPress={()=> navigation.push('Register')}>
                <Text className="text-yellow-900">Register</Text>
            </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
</View >

)}; 

export default Login;