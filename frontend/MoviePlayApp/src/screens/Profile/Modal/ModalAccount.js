import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Modal, ActivityIndicator } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/authSlice";
import authService from "../../../services/authService";
import store from "../../../redux/store";
import { clearUser } from "../../../redux/slices/userSlice";
export default function ModalAccount({ modalVisible, setModalVisible, infoModal }) {

    const [isLoading, setIsLoading] = React.useState(false);
    const dispatch = useDispatch();
    const userId = store.getState().user.userData.userId;

    useEffect(() => {
        if (modalVisible && infoModal === "DeleteAccount") {
            setIsLoading(true);
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 3000);
            return () => clearTimeout(timer);
        } else {
            setIsLoading(false);
        }
    }, [modalVisible, infoModal]);

    const label = infoModal === "Logout" ? "¿Está seguro que desea cerrar sesión?" 
                                         : "¿Está seguro que quiere eliminar la cuenta?";

    const actionBtn = infoModal === "Logout" ? "Cerrar Sesión" : "Eliminar cuenta";


    const handleActionBtn = async () => {
        try {
            if (infoModal === "DeleteAccount") {
                const response = await authService.deleteUser(userId);
                console.log(response)
            } 
            else {
                const response = await authService.logout(userId);
                console.log(response)
            }

            dispatch(logout(userId))
            setModalVisible(false)
        
         } catch (error) {
            console.log(error);
        }

    }
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <Text style={styles.labelText}>{label}</Text>

                        <View style={styles.btnsContainer}>

                        {isLoading ? (
                        <ActivityIndicator size="large" color="#D51D53" style={styles.btn} />
                    ) : (
                        <TouchableOpacity
                            style={[styles.btn, { backgroundColor: "#D51D53" }]}
                            onPress={() => 
                                handleActionBtn()
                            }
                            disabled={isLoading}
                        >
                            <Text style={styles.textStyle}>{actionBtn}</Text>
                        </TouchableOpacity>
                        )}

                        <TouchableOpacity
                            style={[styles.btn, { backgroundColor: "#D9D9D9" }]}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                            }}
                            
                        >
                            <Text style={styles.textStyle}>Cancelar</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.6)"
    },
    modalView: {
        width: wp('88%'),
        backgroundColor: "#192941",
        borderRadius: 7,
        alignItems: "center",
        shadowColor: "#000",
        padding: wp('5%'),
        justifyContent: 'center',
    },

    btnsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    btn: {
        borderRadius: 10,
        width: wp('35%'),
        height: hp('5%'),
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: hp('2%'),
        
    },
    textStyle: {
        color: '#000',
        fontSize: hp('2%'),
        fontWeight: 'medium',
    },
    labelText: {
        fontWeight: "bold",
        color: "#FAFAFA",
        fontSize: hp("3%"),
        textAlign: "center",
        marginHorizontal: hp('2%'),
        marginBottom: hp('2%'),
    }
});