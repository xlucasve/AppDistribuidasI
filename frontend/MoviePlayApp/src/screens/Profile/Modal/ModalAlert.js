import React from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function ModalAlert({ visible, onClose, title, message }) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>{title}</Text>
                    <Text style={styles.modalMessage}>{message}</Text>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>Cerrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: wp('80%'),
        padding: wp('5%'),
        backgroundColor: '#192941',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalTitle: {
        fontSize: hp('3%'),
        fontWeight: 'bold',
        marginBottom: hp('1.5%'),
        color: '#FAFAFA',
        alignSelf: 'flex-start',
    },
    modalMessage: {
        fontSize: hp('2.1%'),
        marginBottom: hp('2%'),
        color: '#FAFAFA',
        alignSelf: 'flex-start',
    },
    closeButton: {
        backgroundColor: '#D51D53',
        width: wp('20%'),
        height: hp('5%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        alignSelf: 'flex-end',
    },
    closeButtonText: {
        color: '#000',
        fontSize: hp('2.3%'),
    },
});
