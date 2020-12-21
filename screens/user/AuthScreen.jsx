import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useReducer } from "react";
import {
  Button,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useDispatch } from "react-redux";

import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";
import Theme from "../../constants/Theme";
import * as authActions from "../../store/actions/auth";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.inputId]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.inputId]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      inputValues: updatedValues,
      inputValidities: updatedValidities,
      formIsValid: updatedFormIsValid,
    };
  }
  return state;
};

const AuthScreen = () => {
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  const signupHandler = () => {
    dispatch(
      authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password
      )
    );
  };

  const inputChangeHandler = useCallback(
    (inputId, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        inputId: inputId,
        value: inputValue,
        isValid: inputValidity,
      });
    },
    [dispatchFormState]
  );

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient
        colors={[Theme.colors.primary, Theme.colors.accent]}
        style={styles.gradient}
      >
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="email"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="password"
              label="password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={6}
              autoCapitalize="none"
              errorText="Please enter a valid password."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <View style={styles.buttonContainer}>
              <Button
                title="Login"
                color={Theme.colors.primary}
                onPress={signupHandler}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Switch to sign up."
                color={Theme.colors.accent}
                onPress={() => {}}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: "Authenticate",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default AuthScreen;
