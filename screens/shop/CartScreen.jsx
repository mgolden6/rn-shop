import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import CartItem from "../../components/shop/CartItem";
import Card from "../../components/UI/Card";
import Theme from "../../constants/Theme";
import * as cartActions from "../../store/actions/cart";
import * as ordersActions from "../../store/actions/orders";

const CartScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        ownerPushToken: state.cart.items[key].ownerPushToken,
        quantity: state.cart.items[key].quantity,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });
  const dispatch = useDispatch();

  const submitOrderHandler = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      Alert.alert(`An error occured while submitting your order`, error, [
        { text: `OK` },
      ]);
      setError();
    }
  }, [error]);

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.amount}>
            ${Math.round((cartTotalAmount.toFixed(2) * 100) / 100)}
          </Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator size="small" color={Theme.colors.primary} />
        ) : (
          <Button
            color={Theme.colors.primary}
            title="Order Now"
            disabled={cartItems.length === 0}
            onPress={submitOrderHandler}
          />
        )}
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            deletable
            onRemove={() => {
              dispatch(cartActions.removeFromCart(itemData.item.productId));
            }}
          />
        )}
      />
    </View>
  );
};

export const cartScreenOptions = {
  headerTitle: "Your Cart",
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: Theme.fonts.bold,
    fontSize: 18,
  },
  amount: {
    color: Theme.colors.primary,
  },
});

export default CartScreen;
