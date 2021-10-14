import { Platform } from "react-native";
import Theme from "../constants/Theme";

export default defaultNavOptions = {
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
};
