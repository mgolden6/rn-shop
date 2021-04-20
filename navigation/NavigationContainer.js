import React, { useEffect, useRef } from "react";
import { NavigationActions } from "react-navigation";
import { useSelector } from "react-redux";
import ShopNavigator from "./ShopNavigator";

const NavigationContainer = () => {
  const navigationRef = useRef();
  const isUserAuthenticated = useSelector((state) => !!state.auth.idToken);
  useEffect(() => {
    if (!isUserAuthenticated) {
      navigationRef.current.dispatch(
        NavigationActions.navigate({ routeName: "Auth" })
      );
    }
  }, [isUserAuthenticated]);

  return <ShopNavigator ref={navigationRef} />;
};

export default NavigationContainer;
