import React from 'react';
import {
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import {View} from 'react-native';
import Header from '../components/Header';
import {backDefaultContainerStyle} from '../styles/GlobalStyles';
import authService from '../services/authService';
import movieService from '../services/moviesService';

export default function Home({navigation}) {
  const textRef = React.useRef(null);
  const [isEditable, setIsEditable] = React.useState(false);

  const [movieData, setMovieData] = React.useState({});

  const logTokeN = async () => {
    console.log(await authService.getAccessToken());
    console.log(await authService.getRefreshToken());
  };

  React.useEffect(() => {
    const getData = async () => {
      let response = await movieService.getHomeData();
      setMovieData(response);
      console.log(movieData);
    };
    getData();
  }, []);

  return (
    <View style={backDefaultContainerStyle}>
      <TouchableOpacity
        style={styles.temporalButton1}
        onPress={() => navigation.navigate('Profile')}>
        <Text>Go to Profile</Text>
      </TouchableOpacity>

      <Text>
        THIS IS A TEST
        <TextInput ref={textRef} editable={isEditable} />
      </Text>
      <TouchableOpacity
        style={styles.temporalButton2}
        onPress={() => {
          logTokeN();
        }}>
        <Text>OPEN INPUT</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.temporalButton2} onPress={() => navigation.navigate('Search')} >
                <Text>Go to Search</Text>
            </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  temporalButton1: {
    backgroundColor: 'red',
    height: 50,
    alignContent: 'center',
    justifyContent: 'center',
  },

  temporalButton2: {
    backgroundColor: 'green',
    height: 50,
    alignContent: 'center',
    justifyContent: 'center',
  },
});
