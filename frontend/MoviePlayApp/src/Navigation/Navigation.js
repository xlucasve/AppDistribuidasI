import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Profile from '../screens/Profile/Profile';
import Search from '../screens/Search';
import Login from '../screens/Login';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeOptions, ProfileOptions } from './HeaderOptions';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Pressable } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Stack = createNativeStackNavigator();

const StackGroup = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const TabGroup = () => {
  return (
    <Tab.Navigator
      initialRouteName="Mi Perfil"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused }) => {
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
      })}
    >
      <Tab.Screen name="Inicio" component={Home} options={HomeOptions} />
      <Tab.Screen
        name="Favoritos"
        component={Home}
        options={{
          tabBarButton: (props) => <Pressable {...props} disabled={true} />,
        }}
      />
      <Tab.Screen
        name="Mi Perfil"
        component={Profile}
        options={ProfileOptions}
      />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  console.log("IS AUTHENTICATED? ", isAuthenticated + " THIS IS Navigation.js");

  return (
    <NavigationContainer>
      {isAuthenticated ? <TabGroup /> : <StackGroup />}
    </NavigationContainer>
  );
};

export default Navigation;
