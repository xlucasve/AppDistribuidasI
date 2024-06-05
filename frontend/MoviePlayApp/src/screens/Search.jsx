import React from "react";
import { Text, Image } from "react-native";
import { View } from "react-native";

import movieImageTest from "../assets/images/movieImageTest.png";
import MovieCard from "../components/MovieCard";

export default function Search({ navigation }) {

    movie_test_data = {
        "movieId": 1,
        "title": "Dune II",
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
        <View>
            <MovieCard movie={movie_test_data} />
        </View>
    );
}