import Order from "../../models/order";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    const idToken = getState().auth.idToken;
    const localId = getState().auth.localId;
    const date = new Date();
    try {
      const response = await fetch(
        `https://rn-shop-62a22.firebaseio.com/orders/${localId}.json?auth=${idToken}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cartItems,
            totalAmount,
            date: date.toISOString(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Add Order didn't work!");
      }

      const resData = await response.json();

      dispatch({
        type: ADD_ORDER,
        orderData: {
          id: resData.name,
          cartItems: cartItems,
          totalAmount: totalAmount,
          date: date,
        },
      });

      for (const cartItem of cartItems) {
        const ownerPushToken = cartItem.ownerPushToken;

        fetch("https://exp.host/--/api/v2/push/send", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Accept-Encoding": "gzip, deflate",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: ownerPushToken,
            title: "Order was placed!",
            body: cartItem.productTitle,
          }),
        });
      }
    } catch (err) {
      throw err;
    }
  };
};

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    const idToken = getState().auth.idToken;
    const localId = getState().auth.localId;
    try {
      const response = await fetch(
        `https://rn-shop-62a22.firebaseio.com/orders/${localId}.json?auth=${idToken}`
      );

      if (!response.ok) {
        throw new Error(`Something went wrong fetching orders!`);
      }

      const resData = await response.json();
      const loadedOrders = [];

      for (const key in resData) {
        loadedOrders.push(
          new Order(
            key,
            resData[key].cartItems,
            resData[key].totalAmount,
            new Date(resData[key].date)
          )
        );
      }
      dispatch({
        type: SET_ORDERS,
        orders: loadedOrders,
      });
    } catch (err) {
      throw err;
    }
  };
};
