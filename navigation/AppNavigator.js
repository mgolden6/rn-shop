import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import { AuthNavigator, ShopNavigator } from "./ShopNavigator";
import StartupScreen from "../screens/user/StartupScreen";

const AppNavigator = () => {
  const triedAutoLogin = useSelector((state) => state.auth.triedAutoLogin);
  const isUserAuthenticated = useSelector((state) => !!state.auth.idToken);

  return (
    <NavigationContainer>
      {!isUserAuthenticated && !triedAutoLogin && <StartupScreen />}
      {!isUserAuthenticated && triedAutoLogin && <AuthNavigator />}
      {isUserAuthenticated && <ShopNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
