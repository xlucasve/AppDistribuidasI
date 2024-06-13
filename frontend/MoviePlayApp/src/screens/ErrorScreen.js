import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ErrorScreen = ({ message, onRetry, iconName }) => {
  return (
    <View style={styles.container}>
      <Ionicons name={iconName} size={hp('25%')} color="#D51D53" />
      <Text style={styles.errorText}>{message}</Text>
      <Pressable style={styles.btn} onPress={onRetry}>
        <Ionicons name="reload-sharp" size={hp('3%')} color="#050505" />
        <Text style={styles.textBtn}>Reintentar</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('5%'),
    backgroundColor: '#03152D',
  },
  errorText: {
    fontSize: hp('2.5%'),
    color: '#D51D53',
    marginBottom: hp('8%'),
  },
  btn: {
    borderRadius: 10,
    width: wp('35%'),
    padding: wp('3%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: hp('2%'),
    backgroundColor: '#D9D9D9',
    flexDirection: 'row',
  },
  textBtn: {
    marginLeft: wp('2%'),
    color: '#050505',
    fontSize: hp('2.3%'),
    fontWeight: 'medium',
  },
});

export default ErrorScreen;
