import * as React from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import Logo from "../assets/images/logo.svg";
import GoogleLogo from "../assets/images/login_btnGoogle.svg";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Login() {
    return (
        <View style={styles.container}>
            <View style={styles.rectangleContainer}>
                <View style={styles.logoContainer}>
                    <Logo
                        width={styles.logoContainer.width}
                        height={styles.logoContainer.height} />
                </View>
                <View style={styles.SignInContainer}>
                    <Text style={styles.signInText}>Sign In</Text>
                    <TouchableOpacity style={styles.signButton}>
                        <GoogleLogo />
                        <Text style={styles.textButton}>Sign in with Google</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#01152D',
    },
    rectangleContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'start',
        backgroundColor: '#192941',
        height: hp('75%'),
        width: wp('86%'),
        borderRadius: 40,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 50,
        },
    },
    logoContainer: {
        width: wp('50%'),
        height: hp('25%'),
        borderRadius: 100,
        marginTop: 50,
        overflow: 'hidden',
    },
    SignInContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 60,
    },
    signInText: {
        color: '#fff',
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    signButton: {
        marginVertical: 30,
        flexDirection: 'row',
        backgroundColor: '#FAFAFA',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        width: wp('58%'),
        height: hp('7.5%'),
    },
    textButton: {
        marginLeft: 18,
        color: 'black',
        fontWeight: 'medium',
        fontSize: 15,
    }
});