import React from 'react';
import Logo from '../assets/images/logo.svg';
import {Pressable, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Search from '../assets/images/search_btn.svg';
import {useNavigation} from '@react-navigation/native';

export const HomeOptions = {
  headerTitle: 'MOVIEPLAY',
  headerTitleStyle: {
    fontFamily: 'RobotoSlab-Medium',
    letterSpacing: 6,
    fontSize: hp('2.75%'),
  },
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: '#192941',
  },
  headerTintColor: '#FAFAFA',

  headerLeft: () => (
    <Pressable style={styles.leftHeaderLogo}>
      <Logo width={styles.logoSize.width} height={styles.logoSize.height} />
    </Pressable>
  ),

  headerRight: () => {
    const navigation = useNavigation();
    return (
      <Pressable
        style={styles.rightHeader}
        onPress={() => navigation.navigate('Search')}>
        <Search
          width={styles.searchSize.width}
          height={styles.searchSize.height}
        />
      </Pressable>
    );
  },
};

export const ProfileOptions = {
  headerTitle: 'MI PERFIL',
  headerTitleStyle: {
    color: '#FAFAFA',
    fontSize: hp('2.75%'),
    weight: 'medium',
    letterSpacing: 2,
  },
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: '#192941',
  },
  headerTintColor: '#FAFAFA',

  headerLeft: () => (
    <Pressable style={styles.leftHeaderLogo}>
      <Logo width={styles.logoSize.width} height={styles.logoSize.height} />
    </Pressable>
  ),
  // headerRight: () => {
  //   const navigation = useNavigation();
  //   return (
  //     <Pressable
  //       style={styles.rightHeader}
  //       onPress={() => navigation.navigate('Search')}>
  //       <Search
  //         width={styles.searchSize.width}
  //         height={styles.searchSize.height}
  //       />
  //     </Pressable>
  //   );
  // },
};

const styles = StyleSheet.create({
  logoSize: {
    width: wp('12%'),
    height: hp('5.5%'),
  },

  leftHeaderLogo: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    overflow: 'hidden',
    marginLeft: wp('4%'),
    marginTop: hp('.3%'),
  },

  rightHeader: {
    marginRight: wp('5%'),
    marginTop: hp('.5%'),
    alignItems: 'center',
    justifyContent: 'center',
  },

  searchSize: {
    width: wp('9%'),
    height: hp('4.3%'),
  },
});
