import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const SideScrollList = scroll => {
  return (
    <View>
      <Text style={styles.movieItem}>{scroll.data.genreName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  movieItem: {
    fontFamily: 'RobotoSlab-Medium',
  },
});

export default SideScrollList;
