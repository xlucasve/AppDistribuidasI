import * as React from "react";
import { Button, Image, StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
    FontFamily,
    FontSize,
    Color,
    Padding,
    StyleVariable,
} from "../styles/GlobalStyles.js";

const Login = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.login}>
            <Image
                style={styles.loginChild}
                resizeMode="cover"
            // source={require("../assets/rectangle-9.png")}
            />
            <Pressable
                style={styles.btnGoogleLight}
                onPress={() => navigation.navigate("Home")}
            >
                <View style={styles.officialButtonsSignInWit}>
                    <Image
                        style={styles.logoGoogleg48dp}
                        resizeMode="cover"
                    // source={require("../assets/logo-googleg-48dp.png")}
                    />
                    <Text style={[styles.signInWith, styles.singInTypo]}>
                        Sign in with Google
                    </Text>
                </View>
            </Pressable>
            <Text style={[styles.singIn, styles.singInTypo]}>Sing In</Text>
            <Image
                style={styles.upscaled6Icon}
                resizeMode="cover"
            // source={require("../assets/21upscaled-6.png")}
            />
            <View style={styles.movieplayFullLogoWrapper}>
                <Image
                    style={styles.movieplayFullLogo}
                    resizeMode="cover"
                //   source={require("../assets/movieplay-full-logo.png")}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    singInTypo: {
        textAlign: "left",
        fontFamily: "Roboto-Medium",
        fontWeight: "500",
    },
    loginChild: {
        top: 89,
        left: 25,
        borderRadius: 10,
        width: 310,
        height: 598,
        position: "absolute",
    },
    logoGoogleg48dp: {
        width: 18,
        height: 18,
    },
    signInWith: {
        fontSize: FontSize.size_sm,
        color: Color.colorGray_200,
        marginLeft: 10,
    },
    officialButtonsSignInWit: {
        backgroundColor: Color.colorWhite,
        borderStyle: "solid",
        borderColor: Color.colorGray_100,
        borderWidth: 1,
        height: 40,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: Padding.p_xs,
        paddingVertical: Padding.p_3xs,
        borderRadius: StyleVariable.pill,
    },
    btnGoogleLight: {
        top: 508,
        left: 90,
        width: 180,
        height: 51,
        padding: Padding.p_10xs,
        borderRadius: StyleVariable.pill,
        position: "absolute",
    },
    singIn: {
        top: 416,
        left: 125,
        fontSize: 36,
        color: "#fafafa",
        position: "absolute",
    },
    upscaled6Icon: {
        height: "25%",
        width: "55.56%",
        top: "19.75%",
        right: "22.22%",
        bottom: "55.25%",
        left: "22.22%",
        borderRadius: 220,
        maxWidth: "100%",
        maxHeight: "100%",
        position: "absolute",
        overflow: "hidden",
    },
    movieplayFullLogo: {
        top: 235,
        left: 0,
        width: 127,
        height: 64,
        position: "absolute",
    },
    movieplayFullLogoWrapper: {
        top: 191,
        left: -237,
        width: 501,
        height: 299,
        position: "absolute",
    },
    login: {
        backgroundColor: "#01152d",
        flex: 1,
        width: "100%",
        height: 800,
        overflow: "hidden",
    },
});

export default Login;
