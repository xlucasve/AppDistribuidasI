import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Pencil from '../../assets/images/editPencil_btn.svg';
import store from '../../redux/store';
import userService from '../../services/userService';
import ModalPicture from './Modal/ModalPicture';

import {PermissionsAndroid} from 'react-native';

const ProfilePicture = ({picture_url}) => {
  const [profileImage, setProfileImage] = React.useState({uri: picture_url});
  const [oldProfileImage, setOldProfileImage] = React.useState(null);
  const [hasProfileImageChanged, setHasProfileImageChanged] =
    React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const userId = store.getState().user.userData.userId;

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Otorgar permisos de camara para MoviePlay',
          message:
            'MoviePlay necesita acceso a tu camara' + 'para tomar fotos.',
          buttonNeutral: 'Preguntar después',
          buttonNegative: 'Cancelar',
          buttonPositive: 'OK',
        },
      );
      return granted;
    } catch (err) {
      console.warn(err);
    }
  };

  const requestGalleryPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        {
          title: 'Otorgar permisos de galería para MoviePlay',
          message:
            'MoviePlay necesita acceso a tu camara' +
            'para acceder a la galería.',
          buttonNeutral: 'Preguntar después',
          buttonNegative: 'Cancelar',
          buttonPositive: 'OK',
        },
      );
      return granted;
    } catch (err) {
      console.warn(err);
    }
  };

  const handleProfileImageEdit = () => {
    setModalVisible(true);
  };

  const handleImageResponse = response => {
    if (response.didCancel) {
      console.log('User cancelled');
    } else if (response.errorCode) {
      console.log('Error: ', response.errorMessage);
    } else {
      setProfileImage(response.assets[0]);
      setOldProfileImage(profileImage);
      setHasProfileImageChanged(true);
    }
  };

  const handleLaunchProfile = async isGallery => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: false,
    };
    if (isGallery) {
      const granted = await requestGalleryPermission();
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        launchImageLibrary(options, handleImageResponse);
      }
    } else {
      const granted = await requestCameraPermission();
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        launchCamera(options, handleImageResponse);
      }
    }
  };

  const handleCancelEditPicture = () => {
    if (oldProfileImage) {
      setProfileImage(oldProfileImage);
      setHasProfileImageChanged(false);
    }
  };

  const saveProfileImage = async () => {
    try {
      await userService.updateUserProfilePicture(userId, profileImage);
    } catch (error) {
      console.log(error);
      setProfileImage(oldProfileImage);
    }
    setHasProfileImageChanged(false);
    setOldProfileImage(null);
  };

  return (
    <View style={styles.editPictureContainer}>
      <View style={styles.editPictureContainer.pictureContainer}>
        <Image
          source={{uri: profileImage.uri}}
          style={{width: '100%', height: '100%'}}
        />
      </View>
      <TouchableOpacity
        style={[
          styles.editPictureContainer.editPencil,
          hasProfileImageChanged && {backgroundColor: '#3B5780'},
        ]}
        onPress={
          !hasProfileImageChanged ? handleProfileImageEdit : saveProfileImage
        }>
        {!hasProfileImageChanged ? (
          <Pencil />
        ) : (
          <Ionicons name="save" size={hp('2.5%')} color="#FAFAFA" />
        )}
      </TouchableOpacity>
      {hasProfileImageChanged && (
        <TouchableOpacity
          style={styles.editPictureContainer.cancelEditPicture}
          onPress={handleCancelEditPicture}>
          <Ionicons name="close" size={hp('2.5%')} color="#FAFAFA" />
        </TouchableOpacity>
      )}
      <ModalPicture
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelectGallery={() => {
          setModalVisible(false);
          handleLaunchProfile(true);
        }}
        onSelectCamera={() => {
          setModalVisible(false);
          handleLaunchProfile(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  editPictureContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    pictureContainer: {
      width: wp('50%'),
      height: wp('50%'),
      borderRadius: 100,
      overflow: 'hidden',
      marginTop: hp('4.25%'),
    },
    editPencil: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      padding: hp('1.5%'),
      backgroundColor: '#EBE205',
      borderRadius: 100,
    },
    cancelEditPicture: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      padding: hp('1.5%'),
      backgroundColor: '#D51D53',
      borderRadius: 100,
    },
  },
});

export default ProfilePicture;
