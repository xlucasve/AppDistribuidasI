import React from 'react';
import {
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
} from 'react-native';
import {View} from 'react-native';
import Header from '../components/Header';
import {backDefaultContainerStyle} from '../styles/GlobalStyles';
import authService from '../services/authService';
import movieService from '../services/moviesService';

export default function Home({navigation}) {
  const textRef = React.useRef(null);
  const [isEditable, setIsEditable] = React.useState(false);

  const [movieData, setMovieData] = React.useState({});

  const logTokeN = async () => {
    console.log(await authService.getAccessToken());
    console.log(await authService.getRefreshToken());
  };

  React.useEffect(() => {
    const getData = async () => {
      let response = await movieService.getHomeData();
      setMovieData(response);
    };
    getData();
  }, []);

  const Item = items => (
    <View>
      <Image source={{uri: items.image}} style={{width: 400, height: 400}} />
      <Text>{items.title}</Text>
    </View>
  );

  const BigMovieCarousel = () => {
    return (
      <View>
        <FlatList
          data={movieData.bigMovies.moviesData}
          renderItem={({item}) => (
            <Item title={item.title} image={item.posterImageLink} />
          )}
          keyExtractor={item => item.movieId}
          horizontal
        />
      </View>
    );
  };

  return (
    <View style={backDefaultContainerStyle}>
      <BigMovieCarousel />
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
  },
});
