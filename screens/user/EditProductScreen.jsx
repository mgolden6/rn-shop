import React, { useCallback, useEffect, useReducer } from "react";
import { Alert, Platform, ScrollView, StyleSheet, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";

import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import Input from "../../components/UI/Input";
import * as productsActions from "../../store/actions/products";

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

const EditProductScreen = (props) => {
  const productId = props.navigation.getParam("productId");
  const editingProduct = useSelector((state) =>
    state.products.userProducts.find((product) => product.id === productId)
  );
  const dispatch = useDispatch();

  const formInitialState = {
    inputValues: {
      title: editingProduct ? editingProduct.title : "",
      imageUrl: editingProduct ? editingProduct.imageUrl : "",
      price: "",
      description: editingProduct ? editingProduct.description : "",
    },
    inputValidities: {
      title: editingProduct ? true : false,
      imageUrl: editingProduct ? true : false,
      price: editingProduct ? true : false,
      description: editingProduct ? true : false,
    },
    formIsValid: editingProduct ? true : false,
  };

  const [formState, dispatchFormState] = useReducer(
    formReducer,
    formInitialState
  );

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong input", "Please correct the errors in the form.", [
        { text: "OK" },
      ]);
      return;
    }
    if (editingProduct) {
      dispatch(
        productsActions.updateProduct(
          productId,
          formState.inputValues.title,
          formState.inputValues.imageUrl,
          formState.inputValues.description
        )
      );
    } else {
      dispatch(
        productsActions.createProduct(
          formState.inputValues.title,
          formState.inputValues.imageUrl,
          +formState.inputValues.price,
          formState.inputValues.description
        )
      );
    }
    props.navigation.goBack();
  }, [dispatch, productId, formState]);

  useEffect(() => {
    props.navigation.setParams({
      submit: submitHandler,
    });
  }, [submitHandler]);

  const inputChangeHandler = (inputId, text) => {
    let isValid = false;
    if (text.trim().length > 0) {
      isValid = true;
    }
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: text,
      isValid: isValid,
      inputId: inputId,
    });
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Input
          label="Title"
          value={formState.inputValues.title}
          onChangeText={inputChangeHandler.bind(this, "title")}
          errorText="Please enter a valid Title!"
          autoCapitalize="words"
          autoCorrect
          returnKeyType="next"
        />
        <Input
          label="Image URL"
          value={formState.inputValues.imageUrl}
          onChangeText={inputChangeHandler.bind(this, "imageUrl")}
          errorText="Please enter a valid Image URL!"
          autoCapitalize="none"
          autoCorrect
          returnKeyType="next"
        />
        {editingProduct ? null : (
          <Input
            label="Price"
            value={formState.inputValues.price}
            onChangeText={inputChangeHandler.bind(this, "price")}
            errorText="Please enter a valid price!"
            keyboardType="decimal-pad"
            returnKeyType="next"
          />
        )}
        <Input
          label="Description"
          value={formState.inputValues.description}
          onChangeText={inputChangeHandler.bind(this, "description")}
          errorText="Please enter a valid description!"
          autoCapitalize="sentences"
          autoCorrect
          multiline
          numberOfLines={3}
          returnKeyType="done"
        />
      </View>
    </ScrollView>
  );
};

EditProductScreen.navigationOptions = (navData) => {
  const submitFunction = navData.navigation.getParam("submit");
  return {
    headerTitle: navData.navigation.getParam("productId")
      ? "Edit Product"
      : "Add Product",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Save"
          iconName={
            Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
          }
          onPress={submitFunction}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
});

export default EditProductScreen;
