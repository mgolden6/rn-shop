import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import OrdersScreen, {
  ordersScreenOptions,
} from "../screens/shop/OrdersScreen";
import defaultNavOptions from "./defaultNavOptions";

const OrdersStackNavigator = createStackNavigator();

const OrdersNavigator = () => {
  return (
    <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <OrdersStackNavigator.Screen
        name="Orders"
        component={OrdersScreen}
        options={ordersScreenOptions}
      />
    </OrdersStackNavigator.Navigator>
  );
};

export default OrdersNavigator;
