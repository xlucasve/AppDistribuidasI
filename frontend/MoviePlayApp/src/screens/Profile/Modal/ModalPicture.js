import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ModalPicture = ({ visible, onClose, onSelectGallery, onSelectCamera }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Seleccionar Imagen</Text>
          <Text style={styles.modalMessage}>Elige una opción:</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.optionButton, styles.cancelButton]} onPress={onClose}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <View style={styles.rightButtonsContainer}>
              <TouchableOpacity style={styles.optionButton} onPress={onSelectGallery}>
                <Text style={styles.buttonText}>Galería</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionButton} onPress={onSelectCamera}>
                <Text style={styles.buttonText}>Cámara</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: wp('80%'),
    paddingVertical: wp('5%'),
    paddingHorizontal: wp('3%'),
    backgroundColor: '#192941',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: hp('2.7%'),
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: hp('1.5%'),
    marginLeft: wp('2%'),
    color: '#FAFAFA',
  },
  modalMessage: {
    fontSize: hp('2.1%'),
    textAlign: 'start',
    alignSelf: 'flex-start',
    marginBottom: hp('2.5%'),
    marginLeft: wp('2%'),
    color: '#FAFAFA',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  rightButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  optionButton: {
    backgroundColor: '#D51D53',
    width: wp('20%'),
    height: hp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: wp('1%'),
  },
  cancelButton: {
    backgroundColor: '#D9D9D9',
    marginRight: 'auto',
  },
  buttonText: {
    color: '#000',
    fontSize: hp('2.1%'),
  },
});

export default ModalPicture;
