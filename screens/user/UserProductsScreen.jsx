import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import ProductItem from "../../components/shop/ProductItem";
import Theme from "../../constants/Theme";
import * as productsActions from "../../store/actions/products";

const UserProductsScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

  const editProductHandler = (id) => {
    props.navigation.navigate("EditProduct", { productId: id });
  };

  //* something isn't right; fails when error from await
  //* reproduce by using wrong url for delete call
  const deleteProductHandler = useCallback(
    async (id) => {
      Alert.alert(
        "Are you sure?",
        "Do you really want to delete this product?",
        [
          { text: "No", style: "default" },
          {
            text: "Yes",
            style: "destructive",
            onPress: async () => {
              setError(null);
              setIsLoading(true);
              try {
                await dispatch(productsActions.deleteProduct(id));
              } catch (err) {
                setError(err.message);
              }
              setIsLoading(false);
            },
          },
        ]
      );
    },
    [dispatch, setError, setIsLoading]
  );

  if (error) {
    return (
      <View style={styles.centered}>
        //? maybe use Alert - "OK" - nav back?
        <Text style={styles.errorMsg}>Failed to delete product!</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Theme.colors.primary} />
      </View>
    );
  }

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            editProductHandler(itemData.item.id);
          }}
        >
          <Button
            color={Theme.colors.primary}
            title="Edit"
            onPress={() => {
              editProductHandler(itemData.item.id);
            }}
          />
          <Button
            color={Theme.colors.primary}
            title="Delete"
            onPress={() => {
              deleteProductHandler(itemData.item.id);
            }}
          />
        </ProductItem>
      )}
    />
  );
};

UserProductsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Products",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Add"
          iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
          onPress={() => {
            navData.navigation.navigate("EditProduct");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  errorMsg: {
    fontFamily: Theme.fonts.bold,
    color: "red",
  },
});

export default UserProductsScreen;
