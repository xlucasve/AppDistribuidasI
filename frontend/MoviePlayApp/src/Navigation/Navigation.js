import React from 'react';
import {Text, Image, StyleSheet, View, Pressable} from 'react-native';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Profile from '../screens/Profile/Profile';
import Search from '../screens/Search';
import Login from '../screens/Login';
import Logo from '../assets/images/logo.svg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeOptions, ProfileOptions} from './HeaderOptions';

const Stack = createNativeStackNavigator();

const StackGroup = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />

      <Stack.Screen name="Home" component={Home} />

      <Stack.Screen name="Profile" component={Profile} />

      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
};

// BottomTabNavigator
const Tab = createBottomTabNavigator();

const TabGroup = () => {
  return (
    <Tab.Navigator
      initialRouteName="Mi Perfil"
      screenOptions={({route, navigation}) => ({
        tabBarIcon: ({color, focused}) => {
          let iconName;
          if (route.name === 'Inicio') {
            iconName = 'home';
          } else if (route.name === 'Favoritos') {
            iconName = 'star';
          } else if (route.name === 'Mi Perfil') {
            iconName = 'person';
          }
          return <Ionicons name={iconName} size={hp('4.2%')} color={color} />;
        },
        tabBarActiveTintColor: '#D51D53',
        tabBarInactiveTintColor: '#FAFAFA',
        tabBarStyle: {
          backgroundColor: '#192941',
          borderTopWidth: 0,
        },
      })}>
      <Tab.Screen name="Inicio" component={Home} options={HomeOptions} />
      <Tab.Screen
        name="Favoritos"
        component={Home}
        options={{
          tabBarButton: props => <Pressable {...props} disabled={true} />,
        }}
      />
      <Tab.Screen
        name="Mi Perfil"
        component={Profile}
        options={ProfileOptions}
      />
      <Tab.Screen name="Sign in" component={Login} />
    </Tab.Navigator>
  );
};

export default function Navigation({navigation}) {
  return (
    <NavigationContainer>
      <TabGroup />
      {/* <StackGroup /> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  logoSize: {
    width: wp('12%'),
    height: hp('5.5%'),
  },
  leftHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    overflow: 'hidden',
  },
});
