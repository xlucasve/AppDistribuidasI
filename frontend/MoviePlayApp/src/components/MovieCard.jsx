import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";


export default function MovieCard({ movie }) {

    return (
        <View style={styles.container}>
            <View>
                <Image source={movie.posterImageLink} alt={movie.title} />
            </View>

            <View className="movie-info">
                <Text>{movie.title}</Text>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#192941',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },

}
)