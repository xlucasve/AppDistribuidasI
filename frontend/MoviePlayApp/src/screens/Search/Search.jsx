import React, {useState, useRef} from 'react';
import {
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {View} from 'react-native';
import SearchIcon from '../../assets/images/search_btn_black.svg';

import MovieCard from '../../components/MovieCard';
import movieService from '../../services/moviesService';
import LoadingPage from '../../components/LoadingPage';
import FilterIcon from '../../assets/images/filter_btn.svg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import FilterPopup from './FilterPopUp';

export default function Search({navigation}) {
  const [searchInput, setSearchInput] = useState('');
  const [movieData, setMovieData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isFilterPopupVisible, setIsFilterPopupVisible] = useState(false);
  const [orderByMethod, setOrderByMethod] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedOrderASC, setSelectedOrderASC] = useState(true);

  const inputRef = useRef();

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.headerContainer}>
          <View style={styles.searchIcon}>
            <TouchableOpacity
              style={styles.searchIcon.btn}
              onPress={() => handleSearch()}>
              <SearchIcon width={28} height={28} />
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
        <TouchableOpacity
          style={styles.filterBtn}
          onPress={() => setIsFilterPopupVisible(!isFilterPopupVisible)}>
          <FilterIcon width={25} height={25} />
        </TouchableOpacity>
      ),
    });
  });

  const filterGenres = (movies, selectedGenres) => {
    const filteredMovies = {movies: []};
    if (selectedGenres.length === 0 || movies === undefined) {
      movies.map(movie => {
        filteredMovies.movies.push(movie);
        console.log(filteredMovies.movies);
      });
      return filteredMovies;
    }

    movies.filter(movie => {
      for (let i = 0; i < movie.genres.length; i++) {
        if (
          selectedGenres.includes(movie.genres[i].name) &&
          !filteredMovies.movies.includes(movie)
        ) {
          filteredMovies.movies.push(movie);
        }
      }
      return false;
    });
    console.log(filteredMovies.movies);

    return filteredMovies;
  };

  const handleSearch = async () => {
    let textInputValue = inputRef.text;
    if (!textInputValue.trim().length) {
      return;
    }

    if (orderByMethod != 'RATING' && orderByMethod != 'DATE') {
      console.log('Empty');
      orderBy = 'DATE';
    } else {
      orderBy = orderByMethod;
    }

    console.log('Order By' + orderBy);
    console.log('Method ' + orderByMethod);

    console.log(
      'Selected genres: ',
      selectedGenres,
      'Selected order: ',
      selectedOrderASC,
      'Order by: ',
      orderBy,
    );

    setIsLoading(true);
    const response = await movieService.searchMovies(
      textInputValue.trimStart(),
      selectedOrderASC ? 'ASC' : 'DESC',
      orderBy,
    );

    movieSet = filterGenres(response.movies, selectedGenres);

    setMovieData(movieSet);
    setIsLoading(false);
  };

  const applyFilters = () => {
    handleSearch();
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
      {isLoading ? (
        <LoadingPage />
      ) : movieData.movies !== undefined && movieData.movies.length > 0 ? (
        <SearchView />
      ) : inputRef.text && inputRef.text.length > 0 ? (
        <RenderNoResults textSearched={inputRef.text} />
      ) : (
        <RenderNoSearch />
      )}

      <FilterPopup
        visible={isFilterPopupVisible}
        onClose={() => setIsFilterPopupVisible(false)}
        onApply={applyFilters}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        orderByMethod={orderByMethod}
        setOrderByMethod={setOrderByMethod}
        selectedOrderASC={selectedOrderASC}
        setSelectedOrderASC={setSelectedOrderASC}
      />
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
    width: wp('64%'),
    height: hp('5.2%'),
    flexDirection: 'row',
    backgroundColor: '#CECECE',
    borderRadius: 10,
    alignItems: 'center',
  },
  searchIcon: {
    marginLeft: wp('2%'),
  },
  inputContainer: {
    marginLeft: wp('.5%'),
    width: '82%',
  },
  inputText: {
    fontSize: hp('2%'),
    color: '#000',
  },

  filterBtn: {
    marginRight: wp('1.5%'),
  },

  noSearchContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noSearchText: {
    color: '#FAFAFA',
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
  },

  noResultsContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: wp('10%'),
    justifyContent: 'center',
  },

  noResultsText: {
    color: '#FAFAFA',
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
  },
});

const RenderNoSearch = () => {
  return (
    <View style={styles.noSearchContainer}>
      <Text style={styles.noSearchText}>Hoy estoy pensando en buscar...</Text>
    </View>
  );
};

const RenderNoResults = ({textSearched}) => {
  return (
    <View style={styles.noResultsContainer}>
      <Text style={styles.noResultsText}>
        No se encontraron resultados para "{`${textSearched}`}".
      </Text>
    </View>
  );
};
