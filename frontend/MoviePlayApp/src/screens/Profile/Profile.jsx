import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ModalAccount from "./Modal/ModalAccount";
import ProfilePicture from './ProfilePicture';
import ProfileNickName from './ProfileNickName';

export default function Profile() {
    const { width, height } = Dimensions.get('window');
    const [deleteACCModalVisible, setDeleteACCModalVisible] = React.useState(false);
    const [logoutModalVisible, setLogoutModalVisible] = React.useState(false);

    return (
        <View style={styles.container}>

            <ProfilePicture />

            <View style={styles.infoContainer}>
                <Text style={styles.infoContainer.nameText}>Juan Perez</Text>
                <Text style={styles.infoContainer.emailText}>Juan.perez1986@gmail.com</Text>
            </View>

            <ProfileNickName initialNickName="JuanPerez123" />

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
