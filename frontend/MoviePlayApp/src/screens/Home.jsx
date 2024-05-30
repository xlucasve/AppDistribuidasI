import React from 'react';
import {
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {View} from 'react-native';
import Header from '../components/Header';
import {backDefaultContainerStyle} from '../styles/GlobalStyles';
import authService from '../services/authService';
import movieService from '../services/moviesService';

export default function Home({navigation}) {
  const textRef = React.useRef(null);
  const [isEditable, setIsEditable] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(true);
  const [movieData, setMovieData] = React.useState({});

  const logTokeN = async () => {
    console.log(await authService.getAccessToken());
    console.log(await authService.getRefreshToken());
  };

  React.useEffect(() => {
    const getData = async () => {
      let response = await movieService.getHomeData();
      setMovieData(response);
      setIsLoading(false);
    };
    getData();
  }, []);

  const Item = items => (
    <View style={styles.carouselItemContainer}>
      <Image
        source={{uri: items.image}}
        style={{
          width: 51,
          height: 51,
          resizeMode: 'contain',
        }}
      />
      <Text>{items.title}</Text>
    </View>
  );

  const BigMovieCarousel = () => {
    return (
      <View style={styles.fullHomeContainer}>
        <FlatList
          data={movieData.bigMovies.moviesData}
          renderItem={({item}) => (
            <Item title={item.title} image={item.posterImageLink} />
          )}
          keyExtractor={item => item.movieId}
          horizontal
          pagingEnabled
        />
      </View>
    );
  };

  return (
    <View style={backDefaultContainerStyle}>
      {isLoading ? <ActivityIndicator /> : <BigMovieCarousel />}
    </View>
  );
}

const styles = StyleSheet.create({
  fullHomeContainer: {
    flex: 1,
  },

  carouselItemContainer: {
    flex: 0.9,
    marginRight: 100,
  },
});
