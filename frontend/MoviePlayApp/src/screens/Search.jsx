import React from "react";
import { Text, Image, StyleSheet } from "react-native";
import { View } from "react-native";

import movieImageTest from "../assets/images/movieImageTest.png";
import MovieCard from "../components/MovieCard";

export default function Search({ navigation }) {

    movie_test_data = {
        "movieId": 1,
        "title": "Dune: Part 2",
        "posterImageLink": movieImageTest,
        "rating": 4.2,
        "genres": [
            {
                "genreId": 1,
                "name": "Acción",
            },
            {
                "genreId": 2,
                "name": "Sci-Fi",
            },
            {
                "genreId": 3,
                "name": "Thriller",
            }
        ]
    }

    return (
        <View style={styles.container}>
            <MovieCard movie={movie_test_data} />
            <MovieCard movie={movie_test_data} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#03152D",
    },
});