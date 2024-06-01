import React, { useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ModalAccount from "./Modal/ModalAccount";
import ProfilePicture from './ProfilePicture';
import ProfileNickName from './ProfileNickName';
import { useSelector } from "react-redux";
import userService from "../../services/userService";
export default function Profile() {
    const { width, height } = Dimensions.get('window');
    const [deleteACCModalVisible, setDeleteACCModalVisible] = React.useState(false);
    const [logoutModalVisible, setLogoutModalVisible] = React.useState(false);
    const [user, setUser] = React.useState(null);

    const userId = useSelector((state) => state.user.userData.userId);

    // const initialNickName = user.name
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await userService.getUserData(userId);
                setUser(userData);
            } catch (error) {
                console.log(error);
            }
        }
        fetchUserData();
    }
        , [userId]);

    if (user === null || user === undefined) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    console.log("USER: ", user)

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
                    style={[styles.buttonsContainer.btnSpace, { backgroundColor: "#D9D9D9" }]}
                    onPress={() => setLogoutModalVisible(true)}
                >
                    <Text style={styles.buttonsContainer.textBtn}>Cerrar Sesión</Text>
                </TouchableOpacity>

                <ModalAccount
                    modalVisible={logoutModalVisible}
                    setModalVisible={setLogoutModalVisible}
                    infoModal={"Logout"}
                />

                <TouchableOpacity
                    style={[styles.buttonsContainer.btnSpace, { backgroundColor: "#D51D53" }]}
                    onPress={() => setDeleteACCModalVisible(true)}
                >
                    <Text style={styles.buttonsContainer.textBtn}>Eliminar cuenta</Text>
                </TouchableOpacity>

                <ModalAccount
                    modalVisible={deleteACCModalVisible}
                    setModalVisible={setDeleteACCModalVisible}
                    infoModal={"DeleteAccount"}
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
            height: hp('6%'),
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: hp('2%'),
        },
        textBtn: {
            color: '#050505',
            fontSize: hp('2.5%'),
            fontWeight: 'medium',
        },
    },
});
