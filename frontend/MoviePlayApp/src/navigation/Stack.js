import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Search from '../screens/Search/Search';
import Login from '../screens/Login/Login';
import { TabGroup } from './TabGroup';

const Stack = createNativeStackNavigator();

export const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="TabGroup">
      <Stack.Screen
        name="TabGroup"
        component={TabGroup}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          headerTitle: '',
          headerTitleStyle: {
            color: '#FAFAFA',
            fontSize: hp('2.75%'),
            weight: 'medium',
            letterSpacing: 2,
          },
          headerStyle: {
            backgroundColor: '#192941',
          },
          headerTintColor: '#FAFAFA',
        }}
      />
    </Stack.Navigator>
  );
};


export const AuthStack = () => {
    return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  };