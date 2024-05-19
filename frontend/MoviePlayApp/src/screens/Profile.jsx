import React from "react";
import { Text, Image } from "react-native";
import { View } from "react-native";
import Header from "../components/Header";

export default function Profile({ navigation }) {
    return (
        <View>
            <Header title="Profile" navigation={navigation} />
            <Text>Profile</Text>
        </View>
    );
}