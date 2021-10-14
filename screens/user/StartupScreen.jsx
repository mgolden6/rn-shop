import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";

import Theme from "../../constants/Theme";
import { authenticate, triedAutoLogin } from "../../store/actions/auth";

const StartupScreen = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const tryAutoLogin = async () => {
      const userAuthDataString = await AsyncStorage.getItem("userAuthData");
      if (!userAuthDataString) {
        dispatch(triedAutoLogin());
        return;
      }
      const userAuthDataObject = JSON.parse(userAuthDataString);
      const {
        email,
        localId,
        idToken,
        refreshToken,
        expirationDateString,
      } = userAuthDataObject;
      const expirationDate = new Date(expirationDateString);

      if (
        !email ||
        !localId ||
        !idToken ||
        !refreshToken ||
        expirationDate <= new Date()
      ) {
        dispatch(triedAutoLogin());
        return;
      }
      dispatch(
        authenticate(email, localId, idToken, refreshToken, expirationDate)
      );
    };
    tryAutoLogin();
  }, [dispatch]);
  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Theme.colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StartupScreen;
