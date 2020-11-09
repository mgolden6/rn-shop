import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Theme from "../constants/Theme";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Theme.colors.primary : "",
      },
      headerTitleStyle: {
        fontFamily: Theme.fonts.bold,
      },
      headerBackTitleStyle: {
        fontFamily: Theme.fonts.bold,
      },
      headerTintColor:
        Platform.OS === "android" ? Theme.colors.light : Theme.colors.primary,
    },
  }
);

export default createAppContainer(ProductsNavigator);
