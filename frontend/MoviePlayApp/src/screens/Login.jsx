import * as React from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import Logo from '../assets/images/logo.svg';
import GoogleLogo from '../assets/images/login_btnGoogle.svg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {GoogleSignin} from '@react-native-google-signin/google-signin';

export default function Login({navigation}) {
  const onGoogleButtonPress = async () => {
    try {
      GoogleSignin.configure({
        webClientId:
          '568362713599-sjg142r6t6o2nq44nhrv11lnq1g6s37i.apps.googleusercontent.com',
      });
      await GoogleSignin.hasPlayServices();
      const {user} = await GoogleSignin.signIn();
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      const raw = JSON.stringify({
        userEmail: user.email,
        realName: user.givenName + ' ' + user.familyName,
        nickname: user.name,
        profilePictureLink: user.photo,
      });

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      await fetch(
        'https://movieplay-api.onrender.com/api/v1/auth/login',
        requestOptions,
      )
        .then(response => response.json())
        .then(result => console.log(result.accessToken));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.rectangleContainer}>
        <View style={styles.logoContainer}>
          <Logo
            width={styles.logoContainer.width}
            height={styles.logoContainer.height}
          />
        </View>
        <View style={styles.SignInContainer}>
          <Text style={styles.signInText}>Sign In</Text>
          <TouchableOpacity
            style={styles.signButton}
            onPress={() => onGoogleButtonPress()}>
            <GoogleLogo />
            <Text style={styles.textButton}>Sign in with Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#01152D',
  },
  rectangleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'start',
    backgroundColor: '#192941',
    height: hp('75%'),
    width: wp('86%'),
    borderRadius: 40,
    elevation: 10, // Añadir sombra para Android
    shadowColor: '#000', // Añadir sombra para iOS
    shadowOffset: {width: 0, height: 2}, // Añadir sombra para iOS
    shadowOpacity: 0.25, // Añadir sombra para iOS
    shadowRadius: 3.84, // Añadir sombra para iOS
  },
  logoContainer: {
    width: wp('50%'),
    height: hp('25%'),
    borderRadius: 100,
    marginTop: hp('6.25%'),
    overflow: 'hidden',
  },
  SignInContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hp('7.5%'),
  },
  signInText: {
    color: '#fff',
    fontSize: hp('4.5%'),
    fontWeight: 'bold',
    marginBottom: hp('3.5%'),
  },
  signButton: {
    marginVertical: hp('3.75%'),
    flexDirection: 'row',
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    width: wp('58%'),
    height: hp('7.5%'),
  },
  textButton: {
    marginLeft: wp('3%'),
    color: 'black',
    fontWeight: 'medium',
    fontSize: hp('1.875%'),
  },
});
