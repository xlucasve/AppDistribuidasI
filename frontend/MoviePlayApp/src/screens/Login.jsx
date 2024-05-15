import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Logo from "../assets/images/logo.svg";
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default Login = () => {
    return (
        <View className="flex flex-1 items-center justify-center bg-[#01152D] text-white">
            <View className="flex flex-col items-center 
                    justify-start bg-[#192941] 
                    h-[75vh] w-[86vw] rounded-[40px]
                    shadow-slate-50">
                <View className="w-[50vw] h-[25vh] rounded-full mt-16 overflow-hidden">
                    <Logo
                        width={styles.logoContainer.width}
                        height={styles.logoContainer.width} />
                </View>
                <View className="flex flex-1 items-center justify-center mb-7">

                    <Text className="text-white text-[36px] font-bold mb-16">Sign In</Text>

                    <View className="flex flex-row items-center 
                    justify-center mb-7
                     ">
                        <GoogleSigninButton
                            style={{ width: wp("55%"), height: hp("7.5%") }}
                            size={GoogleSigninButton.Size.Wide}
                            color={GoogleSigninButton.Color.Light}
                            onPress={() => this.signIn()}
                        />
                    </View>
                </View>
            </View>

        </View>
    );
}




const styles = StyleSheet.create({

    logoContainer: {
        width: wp('50%'),
        height: hp('25%'),
    }

});

