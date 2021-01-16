import Product from "../../models/product";

export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    const idToken = getState().auth.idToken;
    const localId = getState().auth.localId;
    try {
      const response = await fetch(
        `https://rn-shop-62a22.firebaseio.com/products.json?auth=${idToken}`
      );
      if (!response.ok) {
        throw new Error("Fetch Products Failed!");
      }

      const resData = await response.json();
      const loadedProducts = [];

      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            resData[key].ownerId,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }

      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
        userProducts: loadedProducts.filter((prod) => prod.ownerId === localId),
      });
    } catch (err) {
      throw err;
    }
  };
};

export const createProduct = (title, imageUrl, description, price) => {
  return async (dispatch, getState) => {
    const idToken = getState().auth.idToken;
    const localId = getState().auth.localId;
    const response = await fetch(
      `https://rn-shop-62a22.firebaseio.com/products.json?auth=${idToken}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ownerId: localId,
          title,
          imageUrl,
          description,
          price,
        }),
      }
    );

    const resData = await response.json();
    console.log(resData);

    dispatch({
      type: CREATE_PRODUCT,
      createProductData: {
        id: resData.name,
        ownerId: localId,
        title,
        imageUrl,
        description,
        price,
      },
    });
  };
};

export const updateProduct = (id, title, imageUrl, description) => {
  return async (dispatch, getState) => {
    const idToken = getState().auth.idToken;
    const response = await fetch(
      `https://rn-shop-62a22.firebaseio.com/products/${id}.json?auth=${idToken}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          imageUrl,
          description,
        }),
      }
    );

    if (!response.ok) {
      console.log(`updateProduct error: ${response}`);
      throw new Error("Update Product Failed!");
    }

    dispatch({
      type: UPDATE_PRODUCT,
      updateProductData: {
        id,
        title,
        imageUrl,
        description,
      },
    });
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch, getState) => {
    const idToken = getState().auth.idToken;
    const response = await fetch(
      `https://rn-shop-62a22.firebaseio.com/products/${productId}.json?auth=${idToken}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      console.log(`deleteProduct error: ${response}`);
      throw new Error(`Delete Product Failed!`);
    }
    dispatch({
      type: DELETE_PRODUCT,
      productId: productId,
    });
  };
};
