import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Pressable } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Home from '../screens/Home/Home';
import Profile from '../screens/Profile/Profile';
import { HomeOptions, ProfileOptions } from './HeaderOptions';


const Tab = createBottomTabNavigator();

export const TabGroup = () => {
  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
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
          tabBarButton: props => <Pressable {...props} disabled={true} />,
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