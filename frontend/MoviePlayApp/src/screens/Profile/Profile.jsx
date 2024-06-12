import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { Keyboard } from 'react-native';
import ModalAccount from './Modal/ModalAccount';
import ProfilePicture from './ProfilePicture';
import ProfileNickName from './ProfileNickName';
import LoadingPage from '../../components/LoadingPage';
import ErrorScreen from '../ErrorScreen';
import { setError, clearError } from '../../redux/slices/errorSlice';
import userService from '../../services/userService';

export default function Profile() {
    const [deleteACCModalVisible, setDeleteACCModalVisible] = useState(false);
    const [logoutModalVisible, setLogoutModalVisible] = useState(false);
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();
    const error = useSelector((state) => state.error.message);
    const userId = useSelector((state) => state.user.userData.userId);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const fetchUserData = async (userId) => {
        try {
            dispatch(clearError());
            const userData = await userService.getUserData(userId);
            setUser(userData);
        } catch (error) {
            console.log(error);
            dispatch(setError('Error al cargar la información del usuario'));
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchUserData(userId);
        }

    }, [dispatch]);

    if (error) {
        return <ErrorScreen message={error} onRetry={() => fetchUserData()} />;
    }

    if (!isAuthenticated || user === null || user === undefined) {
        return (
            <View style={styles.container}>
                <LoadingPage />
            </View>
        );
    }



    return (
        <View style={styles.container}>
            <ProfilePicture picture_url={user.profilePictureLink} />

            <View style={styles.infoContainer}>
                <Text style={styles.infoContainer.nameText}>{user.realName}</Text>
                <Text style={styles.infoContainer.emailText}>{user.email}</Text>
            </View>

            <ProfileNickName initialNickName={user.nickname} />

            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={[styles.buttonsContainer.btnSpace, { backgroundColor: '#D9D9D9' }]}
                    onPress={() => setLogoutModalVisible(true)}
                >
                    <Text style={styles.buttonsContainer.textBtn}>Cerrar Sesión</Text>
                </TouchableOpacity>

                <ModalAccount
                    modalVisible={logoutModalVisible}
                    setModalVisible={setLogoutModalVisible}
                    infoModal={'Logout'}
                />

                <TouchableOpacity
                    style={[styles.buttonsContainer.btnSpace, { backgroundColor: '#D51D53' }]}
                    onPress={() => setDeleteACCModalVisible(true)}
                >
                    <Text style={styles.buttonsContainer.textBtn}>Eliminar cuenta</Text>
                </TouchableOpacity>

                <ModalAccount
                    modalVisible={deleteACCModalVisible}
                    setModalVisible={setDeleteACCModalVisible}
                    infoModal={'DeleteAccount'}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        color: '#FAFAFA',
        backgroundColor: '#03152D',
    },
    infoContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp('1%'),
        nameText: {
            color: '#FAFAFA',
            fontSize: hp('4.2%'),
            fontWeight: 'bold',
        },
        emailText: {
            color: '#FAFAFA',
            fontSize: hp('2.25%'),
            fontWeight: 'light',
        },
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: hp('10%'),
        btnSpace: {
            borderRadius: 10,
            width: wp('40%'),
            padding: wp('3.5%'),
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: hp('2%'),
        },
        textBtn: {
            color: '#050505',
            fontSize: hp('2.3%'),
            fontWeight: 'medium',
        },
    },
});
