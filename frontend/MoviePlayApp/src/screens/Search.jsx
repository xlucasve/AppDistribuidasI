import React, {useRef, useState} from 'react';
import {
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {View} from 'react-native';
import SearchIcon from '../assets/images/search_btn.svg';

import movieImageTest from '../assets/images/movieImageTest.png';
import MovieCard from '../components/MovieCard';
import {useNavigation} from '@react-navigation/native';
import movieService from '../services/moviesService';
import LoadingPage from '../components/LoadingPage';

export default function Search({navigation}) {
  const [searchInput, setSearchInput] = useState('');
  const [movieData, setMovieData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef();

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.headerContainer}>
          <View style={styles.searchIcon}>
            <TouchableOpacity onPress={() => handleSearch()}>
              <SearchIcon width={35} height={35} />
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              ref={inputRef}
              onChangeText={text => (inputRef.text = text)}
              style={styles.inputText}
              defaultValue={searchInput}
              placeholder="Hoy quiero buscar..."
              onSubmitEditing={() => handleSearch()}
            />
          </View>
        </View>
      ),
      headerRight: () => (
        <View>
          <SearchIcon width={35} height={35} />
        </View>
      ),
    });
  });

  const handleSearch = async () => {
    let textInputValue = inputRef.text;
    if (!textInputValue.trim().length) {
      return;
    }

    setIsLoading(true);
    const response = await movieService.searchMovies(
      textInputValue.trimStart(),
      'DESC',
      'DATE',
    );
    setMovieData(response);
    setIsLoading(false);
  };

  movie_test_data = {
    movieId: 1,
    title: 'Dune: Part 2',
    posterImageLink:
      'https://image.tmdb.org/t/p/original/gzb6P78zeFTnv9eoFYnaJ2YrZ5q.jpg',
    rating: 4.2,
    genres: [
      {
        genreId: 1,
        name: 'Acción',
      },
      {
        genreId: 2,
        name: 'Sci-Fi',
      },
      {
        genreId: 3,
        name: 'Thriller',
      },
    ],
  };

  const SearchView = () => {
    return (
      <View style={styles.container}>
        <FlatList
          data={movieData.movies}
          renderItem={({item}) => <MovieCard movie={item} />}
          keyExtractor={item => item.movieId}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? <LoadingPage /> : <SearchView />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#03152D',
  },

  headerContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  searchIcon: {
    backgroundColor: '#BEBEBE',
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
  inputContainer: {
    backgroundColor: '#BEBEBE',
    justifyContent: 'space-around',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    width: '55%',
    height: '80%',
  },
  inputText: {
    fontSize: 14,
    color: 'black',
  },
});
