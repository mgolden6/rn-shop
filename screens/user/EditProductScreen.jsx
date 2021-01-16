import React, { useCallback, useEffect, useReducer, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";

import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import Input from "../../components/UI/Input";
import Theme from "../../constants/Theme";
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const productId = props.navigation.getParam("productId");
  const editingProduct = useSelector((state) =>
    state.products.userProducts.find((product) => product.id === productId)
  );
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
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
  });

  useEffect(() => {
    if (error) {
      Alert.alert(`An error occurred`, error, [{ text: "Ok" }]);
    }
  }, [error]);

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong input", "Please correct the errors in the form.", [
        { text: "OK" },
      ]);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      if (editingProduct) {
        await dispatch(
          productsActions.updateProduct(
            productId,
            formState.inputValues.title,
            formState.inputValues.imageUrl,
            formState.inputValues.description
          )
        );
      } else {
        await dispatch(
          productsActions.createProduct(
            formState.inputValues.title,
            formState.inputValues.imageUrl,
            formState.inputValues.description,
            +formState.inputValues.price
          )
        );
      }
      props.navigation.goBack();
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, productId, formState]);

  useEffect(() => {
    props.navigation.setParams({
      submit: submitHandler,
    });
  }, [submitHandler]);

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

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Theme.colors.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboard}
      {...(Platform.OS === "ios" && { behavior: "padding" })}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            label="Title"
            errorText="Please enter a valid Title!"
            autoCapitalize="words"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editingProduct ? editingProduct.title : ""}
            initiallyValid={!!editingProduct}
            required
          />
          <Input
            id="imageUrl"
            label="Image URL"
            errorText="Please enter a valid image URL!"
            autoCapitalize="none"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editingProduct ? editingProduct.imageUrl : ""}
            initiallyValid={!!editingProduct}
            required
          />
          {editingProduct ? null : (
            <Input
              id="price"
              label="Price"
              errorText="Please enter a valid price!"
              keyboardType="decimal-pad"
              returnKeyType="next"
              onInputChange={inputChangeHandler}
              required
              min={0.01}
            />
          )}
          <Input
            id="description"
            label="Description"
            errorText="Please enter a valid description!"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            returnKeyType="done"
            onInputChange={inputChangeHandler}
            initialValue={editingProduct ? editingProduct.description : ""}
            initiallyValid={!!editingProduct}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  keyboard: {
    flex: 1,
  },
  form: {
    margin: 20,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default EditProductScreen;
