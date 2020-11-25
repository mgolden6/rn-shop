import React, { useCallback, useEffect, useReducer } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";

import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import Theme from "../../constants/Theme";
import * as productsActions from "../../store/actions/products";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
  }
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
    if (!titleIsValid) {
      Alert.alert("Wrong input", "Please correct the errors in the form.", [
        { text: "OK" },
      ]);
      return;
    }
    if (editingProduct) {
      dispatch(
        productsActions.updateProduct(productId, title, imageUrl, description)
      );
    } else {
      dispatch(
        productsActions.createProduct(title, imageUrl, +price, description)
      );
    }
    props.navigation.goBack();
  }, [dispatch, productId, title, imageUrl, price, description, titleIsValid]);

  useEffect(() => {
    props.navigation.setParams({
      submit: submitHandler,
    });
  }, [submitHandler]);

  const titleChangeHandler = (text) => {
    let isValid = false;
    if (text.trim().length > 0) {
      isValid = true;
    }
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: text,
      isValid: isValid,
      input: "title",
    });
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={titleChangeHandler}
            autoCapitalize="words"
            autoCorrect
            returnKeyType="next"
          />
        </View>
        {!titleIsValid && <Text>Please enter a valid title!</Text>}
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={(imageUrlInput) => setImageUrl(imageUrlInput)}
            autoCapitalize="none"
            returnKeyType="next"
          />
        </View>
        {editingProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={(priceInput) => setPrice(priceInput)}
              keyboardType="decimal-pad"
              returnKeyType="next"
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={(descriptionInput) =>
              setDescription(descriptionInput)
            }
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="done"
          />
        </View>
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

export default EditProductScreen;
