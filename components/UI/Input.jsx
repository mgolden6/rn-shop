import React, { useReducer } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import Theme from "../../constants/Theme";

const INPUT_CHANGE = "INPUT_CHANGE";

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
    //! enter case info
    default:
      return state;
  }
};

const Input = (props) => {
  const inputInitialState = {
    value: props.initialValue ? props.initialValue : "",
    isValid: props.initiallyValid,
    touched: false,
  };
  const [inputState, inputDispatch] = useReducer(
    inputReducer,
    inputInitialState
  );
  const textChangeHandler = (text) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
    inputDispatch({
      type: INPUT_CHANGE,
      value: text,
      isValid: isValid,
    });
  };

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        value={props.value}
        onChangeText={textChangeHandler}
      />
    </View>
  );
  {
    !formState.inputValidities.title && <Text>{props.errorText}</Text>;
  }
};

const styles = StyleSheet.create({
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: Theme.fonts.bold,
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: Theme.colors.accent,
    borderBottomWidth: 1,
  },
});

export default Input;
