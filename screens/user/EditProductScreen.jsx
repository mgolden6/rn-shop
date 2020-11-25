import React, { useCallback, useEffect, useState } from "react";
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

const EditProductScreen = (props) => {
  const productId = props.navigation.getParam("productId");
  const editingProduct = useSelector((state) =>
    state.products.userProducts.find((product) => product.id === productId)
  );
  const dispatch = useDispatch();

  const [title, setTitle] = useState(
    editingProduct ? editingProduct.title : ""
  );
  const [titleIsValid, setTitleIsValid] = useState(false);
  const [imageUrl, setImageUrl] = useState(
    editingProduct ? editingProduct.imageUrl : ""
  );
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(
    editingProduct ? editingProduct.description : ""
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
  }, [dispatch, productId, title, imageUrl, price, description]);

  useEffect(() => {
    props.navigation.setParams({
      submit: submitHandler,
    });
  }, [submitHandler]);

  const titleChangeHandler = (text) => {
    if (text.trim().length === 0) {
      setTitleIsValid(false);
    } else {
      setTitleIsValid(true);
    }
    setTitle(text);
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
