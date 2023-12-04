import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from "react-native";
import { Input, VStack, Heading, Box} from "native-base";
import { Searchbar } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { useFocusEffect } from "@react-navigation/native";
import ListItem from "./ListItem";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EasyButton from "../../Shared/StyledComponents/EasyButtons";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

var { height, width } = Dimensions.get("window");
const ListHeader = () => {
  return (
    <View elevation={1} style={styles.listHeader}>
      <View style={styles.headerItem}></View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "600" }}>Name</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "600" }}>Price</Text>
      </View>
    </View>
  );
};

const Documents = (props) => {
  const [documentList, setDocumentList] = useState();
  const [documentFilter, setDocumentFilter] = useState();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const searchDocument = (text) => {
    if (text === "") {
      setDocumentFilter(documentList);
    }
    setDocumentFilter(
      documentList.filter((i) =>
        i.name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };
  const deleteDocument = (id) => {
    axios
      .delete(`${baseURL}documents/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const documents = documentFilter.filter((item) => item.id !== id);
        setDocumentFilter(documents);
        Toast.show({
          topOffset: 60,
          type: "success",
          text1: "Document Deleted Succesfully",
          text2: "Please Login into your account",
        });
      })
      .catch((error) => console.log(error));
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      axios.get(`${baseURL}documents`).then((res) => {
        // console.log(res.data)
        setDocumentList(res.data);
        setDocumentFilter(res.data);
        setLoading(false);
      });
      setRefreshing(false);
    }, 2000);
  }, []);

  useFocusEffect(
    useCallback(() => {
      // Get Token
      AsyncStorage.getItem("jwt")
        .then((res) => {
          setToken(res);
        })
        // .catch((error) => console.log(error));

      axios.get(`${baseURL}documents`).then((res) => {
        // console.log(res.data);
        setDocumentList(res.data);
        setDocumentFilter(res.data);
        setLoading(false);
      });

      return () => {
        setDocumentList();
        setDocumentFilter();
        setLoading(true);
      };
    }, [])
  );

  return (
    <Box flex={1}>
      <View style={styles.buttonContainer}>
        <EasyButton
          secondary
          medium
          onPress={() => navigation.navigate("Requests")}
        >
          <Icon name="shopping-bag" size={18} color="white" />
          <Text style={styles.buttonText}>Requests</Text>
        </EasyButton>
        <EasyButton
          secondary
          medium
          onPress={() => navigation.navigate("DocumentForm")}
        >
          <Icon name="plus" size={18} color="white" />
          <Text style={styles.buttonText}>Documents</Text>
        </EasyButton>
        <EasyButton
          secondary
          medium
          onPress={() => navigation.navigate("Users")}
        >
          <Icon name="user" size={18} color="white" />
          <Text style={styles.buttonText}>Users</Text>
        </EasyButton>
      </View>
      <Searchbar
        width="80%"
        placeholder="Search"
        onChangeText={(text) => searchDocument(text)}
      />
      {loading ? (
        <View style={styles.spinner}>
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : (
        <FlatList
          data={documentFilter}
          ListHeaderComponent={ListHeader}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item, index }) => (
            <ListItem
              item={item}
              index={index}
              deleteDocument={deleteDocument}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  listHeader: {
    flexDirection: "row",
    padding: 5,
    backgroundColor: "gainsboro",
  },
  headerItem: {
    margin: 3,
    width: width / 6,
  },
  spinner: {
    height: height / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    marginBottom: 160,
    backgroundColor: "white",
  },
  buttonContainer: {
    margin: 20,
    alignSelf: "center",
    flexDirection: "row",
  },
  buttonText: {
    marginLeft: 4,
    color: "white",
  },
});

export default Documents;
