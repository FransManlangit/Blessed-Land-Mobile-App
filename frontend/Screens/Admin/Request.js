import React, {useCallback, useState} from "react";
import {View, Text, FlatList} from "react-native";
import axios from 'axios';
import baseURL from "../../assets/common/baseUrl";
import { useFocusEffect } from "@react-navigation/native";
import RequestCard from "../../Shared/RequestCard";


const Requests = (props) => {

    const [requestList, setRequestList] = useState()


    useFocusEffect(
        useCallback(
            () => {
                getRequests();
            return () => {
                setRequestList()
            }    
            }, [],
        )
    )

    console.log(`${baseURL}requests`)
    const getRequests = () => {
        axios.get(`${baseURL}requests`)
        .then((res) => {
            setRequestList(res.data)
        })
        .catch((error) => console.log(error))
    }
    console.log(requestList)


    return (
        
        <View>
            <FlatList 
                data={requestList}
                renderItem={({item}) => ( 
                    <RequestCard item={item} />
        
                    )
                }
                keyExtractor={(item) => item.id}    
            />
        </View>
    )
}

export default Requests;