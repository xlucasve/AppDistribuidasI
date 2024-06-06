import React, { useState } from 'react';
import {
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { View } from 'react-native';
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

export default function Search({ navigation }) {
  const [searchInput, setSearchInput] = useState('');
  const [movieData, setMovieData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isFilterPopupVisible, setIsFilterPopupVisible] = useState(false);

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.headerContainer}>
          <View style={styles.searchIcon}>
            <TouchableOpacity style={styles.searchIcon.btn} onPress={() => handleSearch()}>
              <SearchIcon width={28} height={28} />
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
        <TouchableOpacity
          style={styles.filterBtn}
          onPress={() => setIsFilterPopupVisible(!isFilterPopupVisible)}>
          <FilterIcon width={25} height={25} />
        </TouchableOpacity>
      ),
    });
  });

  const handleChangeInput = input => {
    setSearchInput(input);
  };

  const handleSearch = async () => {
    if (!searchInput.trim().length) {
      return;
    }

    setIsLoading(true);
    const response = await movieService.searchMovies(
      searchInput.trimStart(),
      'DESC',
      'DATE',
    );
    setMovieData(response);
    setIsLoading(false);
  };


  const SearchView = () => {
    return (
      <View style={styles.container}>
        <FlatList
          data={movieData.movies}
          renderItem={({ item }) => <MovieCard movie={item} />}
          keyExtractor={item => item.movieId}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? <LoadingPage /> : <SearchView />}
      <FilterPopup
        visible={isFilterPopupVisible}
        onClose={() => setIsFilterPopupVisible(false)}
      // onApply={applyFilters}
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
  },
  inputText: {
    fontSize: hp('2%'),
    color: '#000',
  },

  filterBtn: {
    marginRight: wp('1.5%'),
  }
});
