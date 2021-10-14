import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import StartupScreen from "../screens/user/StartupScreen";
import AuthNavigator from "./AuthStackNavigator";
import ShopNavigator from "./ShopDrawerNavigator";

const AppNavigator = () => {
  const triedAutoLogin = useSelector((state) => state.auth.triedAutoLogin);
  const isUserAuthenticated = useSelector((state) => !!state.auth.idToken);

  return (
    <NavigationContainer>
      {!triedAutoLogin && !isUserAuthenticated && <StartupScreen />}
      {triedAutoLogin && !isUserAuthenticated && <AuthNavigator />}
      {isUserAuthenticated && <ShopNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
