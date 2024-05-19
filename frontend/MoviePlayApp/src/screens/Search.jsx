import React from "react";
import { Text, Image } from "react-native";
import { View } from "react-native";
import Header from "../components/Header";

export default function Search({ navigation }) {
    return (
        <View>
            <Header title="Search" navigation={navigation} />
            <Text>Search</Text>
        </View>
    );
}