import React from 'react';
import { useEffect } from 'react';
import Login from './src/screens/Login';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Platform,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import SplashScreen from 'react-native-splash-screen';
import Profile from './src/screens/Profile';
import Search from './src/screens/Search';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Search" component={Search} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

{/* <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'grey',
          headerTitleAlign: 'center',
        }}>
        <Tab.Screen name="Lista" component={Lista} />
        <Tab.Screen name="MoviePlay" component={HomeScreen} />
      </Tab.Navigator> */}


const Lista = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={item => item.id}
        horizontal
      />
    </SafeAreaView>
  );
};

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={item => item.id}
        horizontal
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    marginTop: 0,
    alignItems: 'center',
    fontFamily: 'Roboto',
  },
  item: {
    backgroundColor: '#000000',
    minWidth: 380,
    marginVertical: 8,
    marginHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
  },
});

export default App;
