import React from "react";
import { Text, Image, View, StyleSheet, TouchableOpacity, TextInput, Dimensions } from "react-native";
import Header from "../components/Header";
import { backDefaultContainerStyle } from "../styles/GlobalStyles";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Pencil from '../assets/images/editPencil_btn.svg'


export default function Profile() {

    const { width, height } = Dimensions.get('window');

    const [userName, setUserName] = React.useState('JuanPerez123');


    return (
        <View style={styles.container}>

            <View style={styles.editPictureContainer}>
                <TouchableOpacity style={styles.editPictureContainer.editPencil}>
                    <Pencil />
                </TouchableOpacity>
                <View style={styles.editPictureContainer.pictureContainer}>
                    <Image source={require('../assets/images/default_profile.png')}
                        style={{ width: '100%', height: '100%' }}
                    />
                </View>
            </View>


            <View style={styles.infoContainer}>
                <Text style={styles.infoContainer.nameText}>Juan Perez</Text>
                <Text style={styles.infoContainer.emailText}>Juan.perez1986@gmail.com</Text>
            </View>


            <View style={styles.editUserContainer}>
                <Text style={styles.editUserContainer.userNameLabel}>Username</Text>
                <View style={styles.editUserContainer.inputContainer}>
                    <TextInput
                        style={styles.editUserContainer.inputUserName}
                        value={userName}
                        onChangeText={setUserName}
                    // editable={isEditing}
                    />
                    <TouchableOpacity style={styles.editUserContainer.editPencil}>
                        <Pencil />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.buttonsContainer}>

                <TouchableOpacity style={[styles.buttonsContainer.btnSpace, { backgroundColor: "#D9D9D9" }]}>
                    <Text style={styles.buttonsContainer.textBtn}>Cerrar Sesión</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.buttonsContainer.btnSpace, { backgroundColor: "#D51D53" }]}>
                    <Text style={styles.buttonsContainer.textBtn}>Eliminar cuenta</Text>
                </TouchableOpacity>

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

    editPictureContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',


        pictureContainer: {
            width: wp('70%'),
            height: hp('32%'),
            borderRadius: wp('70%') / 2,
            marginTop: hp('2%'),
            overflow: 'hidden',
            alignContent: 'center',
            justifyContent: 'center',
            position: 'relative',
        },

        editPencil: {
            position: 'absolute',
            bottom: 0,
            right: 0,
            padding: hp('1.5%'),
            backgroundColor: '#EBE205',
            borderRadius: 100,
        },

    },


    infoContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp('1%'),

        nameText: {
            color: '#FAFAFA',
            fontSize: hp('3.75%'),
            fontWeight: 'bold',
        },

        emailText: {
            color: '#FAFAFA',
            fontSize: hp('2%'),
            fontWeight: 'light',
        }
    },

    editUserContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp('6.25%'),
        position: 'relative',

        userNameLabel: {
            color: '#FAFAFA',
            fontSize: hp('2.5%'),
            fontWeight: 'bold',
            alignSelf: 'flex-start',
        },

        inputContainer: {
            position: 'relative',
            marginTop: hp('.5%'),
            justifyContent: 'center',
        },

        inputUserName: {
            color: '#FAFAFA',
            fontSize: hp('2%'),
            fontWeight: 'light',
            borderColor: '#D51D53',
            borderWidth: 1,
            borderRadius: 10,
            width: wp('70%'),
            textAlign: 'center',
        },
        editPencil: {
            position: 'absolute',
            padding: hp('1.1%'),
            backgroundColor: '#EBE205',
            borderRadius: 100,
            alignSelf: 'flex-end',
            right: 5,
        },
    },


    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: hp('8%'),


        btnSpace: {
            borderRadius: 10,
            width: wp('35%'),
            height: hp('5%'),
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: hp('2%'),
        },

        textBtn: {
            color: '#050505',
            fontSize: hp('2%'),
            fontWeight: 'medium',
        }

    },



});

