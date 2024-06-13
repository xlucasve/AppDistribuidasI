import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { hideError } from '../redux/slices/errorSlice';
import { retryRequest } from '../redux/thunks/retryThunk';

const ErrorScreen = ({ message, onRetry, iconName }) => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error.error);

  const handleRetry = () => {
    if (error && error.retryAction && error.retryConfig) {
      dispatch(retryRequest(error.retryConfig));
      dispatch(hideError());
    }

  };

  const handleClose = () => {
    dispatch(hideError());
  };

  return (
    <View style={styles.container}>

      {/* <TouchableOpacity style={styles.closeBtn} onPress={handleClose}>
        <Ionicons name="close-circle" size={hp('5%')} color="#D51D53" />
      </TouchableOpacity> */}

      <Ionicons name={iconName} size={hp('25%')} color="#D51D53" />
      <Text style={styles.errorText}>{message}</Text>
      
      {/* <TouchableOpacity style={styles.btn} onPress={handleRetry}>
        <Ionicons name="reload-sharp" size={hp('3%')} color="#050505" />
        <Text style={styles.textBtn}>Reintentar</Text>
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.btn} onPress={handleClose}>
        {/* <Ionicons name="close-circle-outline" size={hp('3%')} color="#050505" /> */}
        <Text style={styles.textBtn}>Cerrar</Text>
      </TouchableOpacity>

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
  closeBtn: {
    position: 'absolute',
    top: hp('2%'),
    right: wp('2%'),
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
    // marginLeft: wp('2%'),
    color: '#050505',
    fontSize: hp('2.3%'),
    fontWeight: 'medium',
  },
});

export default ErrorScreen;
