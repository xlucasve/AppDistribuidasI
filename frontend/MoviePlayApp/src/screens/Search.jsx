import React, {useState} from 'react';
import {
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
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
              style={styles.inputText}
              defaultValue={searchInput}
              onChangeText={value => handleChangeInput(value)}
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

  const handleChangeInput = input => {
    setSearchInput(input);
  };

  const handleSearch = async () => {
    setIsLoading(true);
    console.log(searchInput);
    const response = await movieService.searchMovies(
      searchInput,
      'DESC',
      'DATE',
    );
    setMovieData(response);
    setIsLoading(false);
    console.log(response);
  };

  movie_test_data = {
    movieId: 1,
    title: 'Dune: Part 2',
    posterImageLink: movieImageTest,
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
        <Text>{searchInput}</Text>
        <MovieCard movie={movie_test_data} />
        <MovieCard movie={movie_test_data} />
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

/* import React, {useState} from 'react';
import {
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {View} from 'react-native';
import {backDefaultContainerStyle} from '../styles/GlobalStyles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SearchIcon from '../assets/images/search_btn.svg';
import movieService from '../services/moviesService';
import LoadingPage from '../components/LoadingPage';

export default function Search({navigation}) {
  const [searchInput, setSearchInput] = useState('');
  const [movieData, setMovieData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeInput = input => {
    setSearchInput(input);
  };

  const handleSearch = async () => {
    setIsLoading(true);
    const response = await movieService.searchMovies(
      searchInput,
      'DESC',
      'DATE',
    );
    setMovieData(response);
    setIsLoading(false);
  };
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
              style={styles.inputText}
              defaultValue={searchInput}
              onChangeText={value => handleChangeInput(value)}
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

  const MovieItem = items => {
    return (
      <View>
        <Image
          source={{uri: items.image}}
          style={{
            borderRadius: 4,
            resizeMode: 'cover',
            width: 150,
            height: 200,
          }}
        />
      </View>
    );
  };

  const SearchItems = () => {
    return (
      <View>
        <Text>Peliculas</Text>
        <FlatList
          data={movieData.movies}
          renderItem={({item}) => <MovieItem image={item.posterImageLink} />}
          keyExtractor={item => item.movieId}
          contentContainerStyle={{
            paddingRight: 20,
            paddingLeft: 20,
            paddingTop: 30,
          }}
          ItemSeparatorComponent={() => <View style={{height: 30}} />}
        />
      </View>
    );
  };

  return (
    <View style={backDefaultContainerStyle}>
      {isLoading ? <LoadingPage /> : <SearchItems />}
    </View>
  );
}

const styles = StyleSheet.create({
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
 */
