// ErrorOverlay.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import ErrorScreen from '../screens/ErrorScreen';

const ErrorOverlay = ({ error, onRetry }) => {
  if (!error) return null;

  return (
    <View style={styles.overlay}>
      <ErrorScreen
        message={error.message}
        iconName={error.iconName}
        onRetry={onRetry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    zIndex: 1,
  },
});

export default ErrorOverlay;
