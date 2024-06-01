import React from "react";
import { View, Image, TouchableOpacity, Alert, StyleSheet, Text } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Pencil from '../../assets/images/editPencil_btn.svg';
import store from "../../redux/store";
import userService from "../../services/userService";
const ProfilePicture = ( {picture_url} ) => {
    const [profileImage, setProfileImage] = React.useState(picture_url);
    const [oldProfileImage, setOldProfileImage] = React.useState(null);
    const [hasProfileImageChanged, setHasProfileImageChanged] = React.useState(false);
    const userId = store.getState().user.userData.userId;

    const handleProfileImageEdit = () => {
        Alert.alert(
            'Seleccionar Imagen',
            'Elige una opción:',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Galería',
                    onPress: () => {
                        handleLaunchProfile(true);
                    }
                },
                {
                    text: 'Cámara',
                    onPress: () => {
                        handleLaunchProfile(false);
                    }
                },
            ],
            { cancelable: true }
        );
    };

    const handleImageResponse = (response) => {
        if (response.didCancel) {
            console.log('User cancelled');
        } else if (response.errorCode) {
            console.log('Error: ', response.errorMessage);
        } else {
            const source = { uri: response.assets[0].uri };
            setOldProfileImage(profileImage);
            setProfileImage(source);
            setHasProfileImageChanged(true);
        }
    };

    const handleLaunchProfile = (isGallery) => {
        const options = {
            mediaType: 'photo',
            quality: 1,
            includeBase64: false,
        };
        if (isGallery) {
            launchImageLibrary(options, handleImageResponse);
        } else {
            launchCamera(options, handleImageResponse);
        }
    };

    const handleCancelEditPicture = () => {
        if (oldProfileImage) {
            setProfileImage(oldProfileImage);
            setHasProfileImageChanged(false);
        }
    };

    const saveProfileImage = () => {
        setHasProfileImageChanged(false);
        setOldProfileImage(null);
        try {
            const response = userService.updateUserProfilePicture(userId, profileImage);
        }
        catch (error) {
            console.log(error);
        }
    };



    return (
        <View style={styles.editPictureContainer}>
            <View style={styles.editPictureContainer.pictureContainer}>
                <Image source={{uri: profileImage}} style={{ width: '100%', height: '100%' }} />
            </View>
            <TouchableOpacity
                style={[styles.editPictureContainer.editPencil, hasProfileImageChanged && { backgroundColor: "#3B5780" }]}
                onPress={!hasProfileImageChanged ? handleProfileImageEdit : saveProfileImage}
            >
                {!hasProfileImageChanged ? <Pencil /> : <Ionicons name="save" size={hp('2.5%')} color="#FAFAFA" />}
            </TouchableOpacity>
            {hasProfileImageChanged &&
                <TouchableOpacity
                    style={styles.editPictureContainer.cancelEditPicture}
                    onPress={handleCancelEditPicture}
                >
                    <Ionicons name="close" size={hp('2.5%')} color="#FAFAFA" />
                </TouchableOpacity>
            }
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
