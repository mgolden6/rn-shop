import React, { useState } from "react";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import thunk from "redux-thunk";
import * as Notifications from "expo-notifications";

import authReducer from "./store/reducers/auth";
import productsReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";
import ordersReducer from "./store/reducers/orders";
import AppNavigator from "./navigation/AppNavigator";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return { shouldShowAlert: true };
  },
});

const rootReducer = combineReducers({
  auth: authReducer,
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

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
        onError={console.warn}
      />
    );
  }

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
