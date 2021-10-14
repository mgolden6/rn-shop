import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import defaultNavOptions from "./defaultNavOptions";
import AuthScreen, { authScreenOptions } from "../screens/user/AuthScreen";

const AuthStackNavigator = createStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AuthStackNavigator.Screen
        name="Auth"
        component={AuthScreen}
        options={authScreenOptions}
      />
    </AuthStackNavigator.Navigator>
  );
};

export default AuthNavigator;
