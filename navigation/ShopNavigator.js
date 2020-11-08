import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Theme from "../constants/Theme";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
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
