import React from 'react';
import { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import Navigation from './src/navigation/Navigation.js';
import store from './src/redux/store.js';
import { Provider } from 'react-redux';



export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

