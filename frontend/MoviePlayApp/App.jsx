import React from 'react';
import { useEffect } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, Platform, Pressable, } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Navigation from './src/Navigation/Navigation.js';


// 

export default function App() {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Navigation />
  );
};



// const Item = ({ title }) => (
//   <View style={styles.item}>
//     <Text style={styles.title}>{title}</Text>
//   </View>
// );

// const Lista = () => {
//   return (
//     <SafeAreaView style={styles.container}>
//       <FlatList
//         data={DATA}
//         renderItem={({ item }) => <Item title={item.title} />}
//         keyExtractor={item => item.id}
//         horizontal
//       />
//     </SafeAreaView>
//   );
// };

// const HomeScreen = () => {
//   return (
//     <SafeAreaView style={styles.container}>
//       <FlatList
//         data={DATA}
//         renderItem={({ item }) => <Item title={item.title} />}
//         keyExtractor={item => item.id}
//         horizontal
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({

//   container: {
//     flex: 1,
//     marginTop: 0,
//     alignItems: 'center',
//     fontFamily: 'Roboto',
//   },
//   item: {
//     backgroundColor: '#000000',
//     minWidth: 380,
//     marginVertical: 8,
//     marginHorizontal: 16,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 32,
//   },
// });


