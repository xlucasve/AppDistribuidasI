import React, { useEffect } from 'react';
import {
  Text,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { View } from 'react-native';
import movieService from '../services/moviesService';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LoadingPage from '../components/LoadingPage';

export default function Home({ }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [movieData, setMovieData] = React.useState({});

  useEffect(() => {
    const getData = async () => {
      let response = await movieService.getHomeData();
      setMovieData(response);
      setIsLoading(false);
    };
    if (isLoading) {
      getData();
    }
  }, []);

  const CarouselItem = items => (
    <View style={styles.carouselItemContainer}>
      <Image
        source={{ uri: items.image }}
        style={{
          borderRadius: 50,
          resizeMode: 'cover',
          width: wp('90%'),
          height: hp('65%'),
        }}
      />
      <Text numberOfLines={1} style={styles.carouselMovieTitle}>
        {items.title.length < 30
          ? `${items.title}`
          : `${items.title.substring(0, 25)}...`}
      </Text>
    </View>
  );

  const BigMovieCarousel = () => {
    return (
      <ScrollView style={styles.fullHomeContainer}>
        <View style={styles.carouselContainer}>
          <FlatList
            data={movieData.bigMovies.moviesData}
            renderItem={({ item }) => (
              <CarouselItem title={item.title} image={item.posterImageLink} />
            )}
            keyExtractor={item => item.movieId}
            horizontal
            pagingEnabled
            ItemSeparatorComponent={() => <View style={{ width: 40 }} />}
            contentContainerStyle={{ paddingRight: 22, paddingLeft: 22 }}
            bounces={false}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={styles.defaultContainer}>
      {isLoading ? <LoadingPage /> : <BigMovieCarousel />}
    </View>
  );
}

const styles = StyleSheet.create({
  defaultContainer: {
    flex: 1,
    backgroundColor: '#03152D',
  },

  fullHomeContainer: {
    flex: 1,
  },

  carouselContainer: {
    flex: 0.85,
    paddingTop: '4%',
  },

  carouselItemContainer: {
    alignItems: 'center',
  },

  carouselMovieTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,

    color: '#FAFAFA',
  },

  genreListsContainer: {
    backgroundColor: 'yellow',
  },
});
