import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Keyboard } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Pencil from '../../assets/images/editPencil_btn.svg';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import userService from '../../services/userService';
import store from '../../redux/store';
import ModalAlert from './Modal/ModalAlert';

const ProfileNickName = ({ initialNickName }) => {

    const [nickName, setNickName] = useState(initialNickName);
    const [hasNickNameChanged, setHasNickNameChanged] = useState(false);
    const [oldNickName, setOldNickName] = useState(null);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState({ title: '', message: '' });

    const userId = store.getState().user.userData.userId;
    const nicknameInputRef = useRef(null);

    const validateNickname = async () => {
        setOldNickName(nickName);
        Keyboard.dismiss();

        if (nickName.length < 3 || nickName.length > 20) {
            handleModalAlert('Error', 'El nombre de usuario debe tener entre 3 y 20 caracteres.');
        }
        else if (!/^[a-zA-Z0-9_]+$/.test(nickName)) {
            handleModalAlert('Error', 'El nombre de usuario solo puede contener caracteres alfanuméricos y guiones bajos.');
        }
        else {
            try {
                await userService.updateUserNickname(userId, nickName);
            } catch (error) {
                console.log(error);
                if (error.response.status === 409) {
                    handleModalAlert('Error', 'El nombre de usuario ya está en uso.');
                }} 
        }

        setOldNickName(null);
        setHasNickNameChanged(false);
    };

    const handleModalAlert = (title, message) => {
        setModalMessage({ title: title, message: message });
        setModalVisible(true);
        setNickName(oldNickName);
    }


    const handleNicknameEdit = () => {
        if (nicknameInputRef.current) {
            nicknameInputRef.current.focus();
        }
    };


    const handleChangeText = (val) => {
        if (hasNickNameChanged === false && oldNickName === null) {
            setOldNickName(nickName);
        }
        setNickName(val);
        setHasNickNameChanged(true);
    };

    const handleCancelNickNameEdit = () => {
        if (oldNickName !== null) {
            setNickName(oldNickName);
            setHasNickNameChanged(false);
        }
    };

    return (
        <View style={styles.editUserContainer}>
            <Text style={styles.nickNameLabel}>Nickname</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    ref={nicknameInputRef}
                    style={styles.inputNickName}
                    value={nickName}
                    onChangeText={handleChangeText}
                    maxLength={20}
                />
                <TouchableOpacity
                    style={[styles.editPencil, hasNickNameChanged && { backgroundColor: "#3B5780" }]}
                    onPress={!hasNickNameChanged ? handleNicknameEdit : validateNickname}
                >
                    {!hasNickNameChanged
                        ? <Pencil />
                        : <Ionicons name="save" size={hp('2.5%')} color="#FAFAFA" />}
                </TouchableOpacity>
                {hasNickNameChanged &&
                    <TouchableOpacity
                        style={styles.cancelEditNickName}
                        onPress={handleCancelNickNameEdit}
                    >
                        <Ionicons name="close" size={hp('2.5%')} color="#FAFAFA" />
                    </TouchableOpacity>
                }
            </View>

            <ModalAlert
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                title={modalMessage.title}
                message={modalMessage.message}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    editUserContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp('6.5%'),
        position: 'relative',
    },
    nickNameLabel: {
        color: '#FAFAFA',
        fontSize: hp('2.9%'),
        fontWeight: 'bold',
        alignSelf: 'flex-start',
    },
    inputContainer: {
        position: 'relative',
        marginTop: hp('.7%'),
        justifyContent: 'center',
    },
    inputNickName: {
        color: '#FAFAFA',
        fontSize: hp('2.3%'),
        fontWeight: 'light',
        borderColor: '#D51D53',
        borderWidth: 1,
        borderRadius: 10,
        width: wp('75%'),
        textAlign: 'left',
        paddingLeft: wp('5%'),
    },
    editPencil: {
        position: 'absolute',
        padding: hp('1.1%'),
        backgroundColor: '#EBE205',
        borderRadius: 100,
        alignSelf: 'flex-end',
        right: 5,
    },
    cancelEditNickName: {
        position: 'absolute',
        padding: hp('1.1%'),
        backgroundColor: '#D51D53',
        borderRadius: 100,
        alignSelf: 'flex-start',
        right: 50,
    },
});

export default ProfileNickName;
