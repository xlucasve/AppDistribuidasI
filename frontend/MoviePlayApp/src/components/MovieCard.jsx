import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FavoriteMovie_false from '../assets/images/favoriteMovie_false.svg';
import FavoriteMovie_true from '../assets/images/favoriteMovie_true.svg';
import RatingStar from '../assets/images/ratingStar.svg';

export default function MovieCard({ movie }) {
  const [isFavorite, setIsFavorite] = React.useState(false);

  const genresList = movie.genres.map(genre => {
    return <GenreCard genre={genre.name} key={genre.genreId} />;
  });

  const ratingStarsList = [];
  const rate = (movie.rating / 2).toFixed(2);


  for (let i = 1; i <= 5; i++) {
    ratingStarsList.push(
      <RatingStar
        key={i}
        style={styles.body.ratingStar}
        fill={i < rate ? '#FFD700' : '#03152D'}
        width={styles.body.ratingStar.width}
        height={styles.body.ratingStar.height}
      />,
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.poster.container}>
        <Image
          source={{ uri: movie.posterImageLink }}
          alt={movie.title}
          style={styles.poster.image}
          resizeMode='cover'

        />
      </View>

      <View style={styles.body.container}>
        <Text style={styles.body.title}>{movie.title}</Text>
        <View style={styles.body.rating.container}>
          {ratingStarsList}
          <Text style={styles.body.rating.text}>{rate}</Text>
        </View>
        <View style={styles.body.genre}>{genresList}</View>
        <Pressable
          style={styles.body.favorite}
          onPress={() => setIsFavorite(!isFavorite)}>
          {!isFavorite ? (
            <FavoriteMovie_false></FavoriteMovie_false>
          ) : (
            <FavoriteMovie_true></FavoriteMovie_true>
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('20%'),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: hp('1%'),
  },
  poster: {
    container: {
      width: wp('25%'),
      height: hp('20%'),
      borderRadius: 15,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 7,

    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 15,
      elevation: 7,
    },
  },

  body: {
    container: {
      width: wp('65%'),
      height: hp('20%'),
      justifyContent: 'space-around',
      marginLeft: wp('4%'),
    },
    title: {
      color: '#FAFAFA',
      fontSize: hp('2.4%'),
      fontWeight: 'bold',
    },
    rating: {
      container: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      text: {
        color: '#FDFDFD',
        fontSize: hp('2.1%'),
        marginLeft: wp('1%'),
      },
    },
    ratingStar: {
      width: wp('5%'),
      height: hp('4%'),
      marginRight: wp('1%'),
    },

    genre: {
      flexDirection: 'row',
      container: {
        marginRight: wp('4%'),
        marginBottom: hp('1%'),
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#DADADA',
        padding: 2,
      },
      text: {
        color: '#FAFAFA',
        fontSize: hp('1.5%'),
      },
    },

    favorite: {

    },
  },
});

const GenreCard = ({ genre }) => {
  return (
    <View style={styles.body.genre.container}>
      <Text style={styles.body.genre.text}>{genre}</Text>
    </View>
  );
};
