import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import Theme from "../constants/Theme";

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Theme.colors.primary : "",
      },
      headerTintColor:
        Platform.OS === "android" ? Theme.colors.light : Theme.colors.primary,
    },
  }
);

export default createAppContainer(ProductsNavigator);
