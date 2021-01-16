import Product from "../../models/product";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  SET_PRODUCTS,
  UPDATE_PRODUCT,
} from "../actions/products";

const initialState = {
  userProducts: [],
  availableProducts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        userProducts: action.userProducts,
        availableProducts: action.products,
      };
    case CREATE_PRODUCT:
      const newProduct = new Product(
        action.createProductData.id,
        action.createProductData.ownerId,
        action.createProductData.title,
        action.createProductData.imageUrl,
        action.createProductData.description,
        action.createProductData.price
      );
      return {
        ...state,
        userProducts: state.userProducts.concat(newProduct),
        availableProducts: state.availableProducts.concat(newProduct),
      };
    case UPDATE_PRODUCT:
      const userProductIndex = state.userProducts.findIndex(
        (userProduct) => userProduct.id === action.updateProductData.id
      );
      const availableProductIndex = state.availableProducts.findIndex(
        (availableProduct) =>
          availableProduct.id === action.updateProductData.id
      );
      const updatedProduct = new Product(
        action.updateProductData.id,
        state.userProducts[userProductIndex].ownerId,
        action.updateProductData.title,
        action.updateProductData.imageUrl,
        action.updateProductData.description,
        state.userProducts[userProductIndex].price
      );
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[userProductIndex] = updatedProduct;
      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[availableProductIndex] = updatedProduct;
      return {
        ...state,
        userProducts: updatedUserProducts,
        availableProducts: updatedAvailableProducts,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (userProduct) => userProduct.id !== action.productId
        ),
        availableProducts: state.availableProducts.filter(
          (availableProduct) => availableProduct.id !== action.productId
        ),
      };
  }
  return state;
};
