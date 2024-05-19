import React from "react";
import { Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { View } from "react-native";
import Header from "../components/Header";


export default function Home({ navigation }) {
    return (
        <View>
            <Header title="Home" navigation={navigation} />
            <Text>HOME</Text>


            <TouchableOpacity style={styles.temporalButton1} onPress={() => navigation.navigate('Profile')} >
                <Text>Go to Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.temporalButton2} onPress={() => navigation.navigate('Search')} >
                <Text>Go to Search</Text>
            </TouchableOpacity>


        </View>
    );
}

const styles = StyleSheet.create({
    temporalButton1: {
        backgroundColor: 'red',
        height: 50,
        alignContent: 'center',
        justifyContent: 'center',
    },

    temporalButton2: {
        backgroundColor: 'green',
        height: 50,
        alignContent: 'center',
        justifyContent: 'center',
    }
}
);


