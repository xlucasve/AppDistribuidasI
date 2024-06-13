import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, StyleSheet, Pressable } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import Home from '../screens/Home';
import Profile from '../screens/Profile/Profile';
import Search from '../screens/Search/Search';
import Login from '../screens/Login';
import { HomeOptions, ProfileOptions } from './HeaderOptions';
import ErrorOverlay from '../components/ErrorOverlay'; // Asegúrate de importar el nuevo componente ErrorOverlay
import { hideError } from '../redux/slices/errorSlice';

const Stack = createNativeStackNavigator();

const MainStack = () => {
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

const Tab = createBottomTabNavigator();

const TabGroup = () => {
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

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const Navigation = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const error = useSelector(state => state.error.error);
  const dispatch = useDispatch();

  const handleRetry = () => {
    if (error?.onRetry) {
      error.onRetry();
    }
    dispatch(hideError());
  };

  return (
    <View style={styles.container}>
      <NavigationContainer>
        {isAuthenticated ? <MainStack /> : <AuthStack />}
      </NavigationContainer>
      <ErrorOverlay error={error} onRetry={handleRetry} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Navigation;
