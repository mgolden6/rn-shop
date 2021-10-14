import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProductDetailScreen, {
  productDetailScreenOptions,
} from "../screens/shop/ProductDetailScreen";
import ProductsOverviewScreen, {
  productsOverviewScreenOptions,
} from "../screens/shop/ProductsOverviewScreen";
import CartScreen, { cartScreenOptions } from "../screens/shop/CartScreen";
import defaultNavOptions from "./defaultNavOptions";

const ProductsStackNavigator = createStackNavigator();

const ProductsNavigator = () => {
  return (
    <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ProductsStackNavigator.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={productsOverviewScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={productDetailScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name="Cart"
        component={CartScreen}
        options={cartScreenOptions}
      />
    </ProductsStackNavigator.Navigator>
  );
};

export default ProductsNavigator;
