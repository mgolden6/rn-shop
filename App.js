import React, { useState } from "react";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { AppLoading } from "expo";
import * as Font from "expo-font";

import ShopNavigator from "./navigation/ShopNavigator";
import productsReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
});

const store = createStore(rootReducer);

let customFonts = {
  "montserrat-regular": require("./assets/fonts/Montserrat-Regular.ttf"),
  "montserrat-bold": require("./assets/fonts/Montserrat-Bold.ttf"),
};

const fetchFonts = () => {
  return Font.loadAsync(customFonts);
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }

  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}
