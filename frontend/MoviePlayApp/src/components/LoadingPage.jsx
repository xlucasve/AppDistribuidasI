// LoadingPage.js
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const LoadingPage = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#D51D53" style={styles.loading} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#03152D',
    },
    loading: {
        transform: [{ scale: 2 }],
    },
});

export default LoadingPage;
