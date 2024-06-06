import React from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FavoriteMovie_false from '../assets/images/favoriteMovie_false.svg';
import FavoriteMovie_true from '../assets/images/favoriteMovie_true.svg';
import RatingStar from '../assets/images/ratingStar.svg';

export default function MovieCard({movie}) {
  const [isFavorite, setIsFavorite] = React.useState(false);

  const genresList = movie.genres.map(genre => {
    return <GenreCard genre={genre.name} key={genre.genreId} />;
  });

  const ratingStarsList = [];

  for (let i = 1; i <= 5; i++) {
    ratingStarsList.push(
      <RatingStar
        key={i}
        style={styles.body.ratingStar}
        fill={i < movie.rating ? '#FFD700' : '#03152D'}
        width={styles.body.ratingStar.width}
        height={styles.body.ratingStar.height}
      />,
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.poster.container}>
        <Image
          source={{uri: movie.posterImageLink}}
          alt={movie.title}
          style={styles.poster.image}
        />
      </View>

      <View style={styles.body.container}>
        <Text style={styles.body.title}>{movie.title}</Text>
        <View style={styles.body.rating.container}>
          {ratingStarsList}
          <Text style={styles.body.rating.text}>{movie.rating}</Text>
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
    width: wp('90%'),
    height: hp('17.5%'),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: hp('1%'),
  },
  poster: {
    container: {
      width: wp('25%'),
      height: hp('17%'),
      borderRadius: 10,
      overflow: 'hidden',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 4,
    },
    image: {
      width: '100%',
      height: '100%',
    },
  },

  body: {
    container: {
      width: wp('65%'),
      height: hp('17%'),
      justifyContent: 'space-around',
      marginLeft: wp('4%'),
      top: hp('-1%'),
    },
    title: {
      color: '#FAFAFA',
      fontSize: hp('3%'),
      fontWeight: 'bold',
    },
    rating: {
      container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp('1%'),
      },
      text: {
        color: '#FAFAFA',
        fontSize: hp('2.5%'),
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
      bottom: hp('-.8%'),
    },
  },
});

const GenreCard = ({genre}) => {
  return (
    <View style={styles.body.genre.container}>
      <Text style={styles.body.genre.text}>{genre}</Text>
    </View>
  );
};
