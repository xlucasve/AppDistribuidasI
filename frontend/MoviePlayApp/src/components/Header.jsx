import React from 'react'
import { StyleSheet, Text, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Logo from "../assets/images/logo.svg";
import Search from "../assets/images/search_btn.svg";
import Back from "../assets/images/back_btn.svg";
import Filter from "../assets/images/filter_btn.svg";
import { useNavigation } from '@react-navigation/native';
export default function Header({ title }) {
  const navigation = useNavigation();
  const handleLeftClick = () => {
    if (title === 'Home' || 'Profile') {
      navigation.navigate('Home');
    }
    else {
      navigation.goBack();
    }
  }

  console.log(title)

  return (

    <View style={styles.header.container}>

      <View style={styles.left.container} onPress={handleLeftClick}>
        {['Home', 'Profile'].includes(title)
          ? <Logo width={styles.left.logoSize.width} height={styles.left.logoSize.height} />
          // OTHER OPTIONS: MoviePage, Favorites, Search: 
          : <Back width={styles.left.backSize.width} height={styles.left.backSize.height} />

        }
      </View>


      <View style={styles.middle.container}>
        {title === 'Home'
          ? <Text style={styles.middle.homeText}>MOVIEPLAY</Text>
          : title === 'Search'
            ? <Text>SEARCHBAR</Text> // I don't know how to do this
            : title !== 'MoviePage'
              ? <Text style={styles.middle.titleText}>{title === 'Profile' ? 'MI PERFIL' : "MIS FAVORITOS"}</Text>
              : null // MOVIEPAGE doesn't show anything
        }
      </View>


      <View style={styles.right.container}>
        {['Home', 'Profile', 'Favorites'].includes(title)
          ? <Search width={styles.right.searchSize.width} height={styles.right.searchSize.height} />
          : title === 'Search'
            ? <Filter width={styles.right.filterSize.width} height={styles.right.filterSize.height} />
            // OTHER OPTIONS: MoviePage: 
            : <Text>FAVORITEBTN</Text> // WE DON'T NEED THIS YET.
        }
      </View>

    </View>
  );
};

const styles = StyleSheet.create({

  header: {
    container: {
      flexDirection: 'row',
      height: hp('7%'),
      width: wp('100%'),
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#192941',
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    }
  },


  left: {
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      width: wp('12%'),
      height: hp('5.5%'),
      borderRadius: 100,
      overflow: 'hidden',
      marginLeft: 15,
    },
    logoSize: {
      width: wp('12%'),
      height: hp('5.5%'),
    },
    backSize: {
      width: wp('6.5%'),
      height: hp('3%'),
    }
  },

  middle: {
    container: {
      width: wp('60%'),
      height: hp('5.5%'),
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 15,
    },
    homeText: {
      color: 'white',
      fontSize: 20,
      fontFamily: 'RobotoSlab-Medium',
      letterSpacing: 6
    },
    titleText: {
      color: 'white',
      fontSize: 20,
      weight: 'medium',
      letterSpacing: 2,
    },
  },

  right: {
    container: {
      marginRight: 20,
      width: wp('9%'),
      height: hp('4%'),
      alignItems: 'center',
      justifyContent: 'center',
    },
    searchSize: {
      width: wp('9%'),
      height: hp('4%'),
    },
    filterSize: {
      width: wp('9%'),
      height: hp('3.4%'),
    }
  },



});