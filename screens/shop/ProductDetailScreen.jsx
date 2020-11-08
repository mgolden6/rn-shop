import React from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import Theme from "../../constants/Theme";

const ProductDetailScreen = (props) => {
  const productId = props.navigation.getParam("productId");
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === productId)
  );

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.actions}>
        <Button
          color={Theme.colors.primary}
          title="Add to Cart"
          onPress={() => {}}
        />
      </View>
      <Text style={styles.price}>${selectedProduct.price}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("productTitle"),
  };
};

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: "100%",
  },
  actions: {
    marginVertical: 20,
    alignItems: "center",
  },
  price: {
    fontFamily: Theme.fonts.bold,
    fontSize: 20,
    color: Theme.colors.accent,
    textAlign: "center",
    marginVertical: 20,
  },
  description: {
    fontFamily: Theme.fonts.regular,
    fontSize: 14,
    color: Theme.colors.primary,
    textAlign: "center",
    marginHorizontal: 20,
  },
});

export default ProductDetailScreen;
