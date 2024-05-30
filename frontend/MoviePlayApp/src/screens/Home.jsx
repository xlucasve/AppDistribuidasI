import React from 'react';
import {
  Text,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {View} from 'react-native';
import {backDefaultContainerStyle} from '../styles/GlobalStyles';
import movieService from '../services/moviesService';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function Home({navigation}) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [movieData, setMovieData] = React.useState({});

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
          borderRadius: 60,
          resizeMode: 'cover',
          width: wp('90%'),
          height: hp('65%'),
        }}
      />
      <Text>{items.title}</Text>
    </View>
  );

  const BigMovieCarousel = () => {
    return (
      <View style={styles.fullHomeContainer}>
        <View style={styles.carouselContainer}>
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

  carouselContainer: {
    flex: 1,
    paddingLeft: wp('4%'),
  },

  carouselItemContainer: {
    flex: 1,
    paddingTop: hp('2%'),
    paddingRight: wp('6%'),
    alignContent: 'center',
    alignItems: 'center',
  },
});
