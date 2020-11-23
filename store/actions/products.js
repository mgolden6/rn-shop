export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";

export const createProduct = (title, imageUrl, price, description) => {
  return {
    type: CREATE_PRODUCT,
    createProductData: {
      title,
      imageUrl,
      price,
      description,
    },
  };
};

export const updateProduct = (id, title, imageUrl, description) => {
  return {
    type: UPDATE_PRODUCT,
    updateProductData: {
      id,
      title,
      imageUrl,
      description,
    },
  };
};

export const deleteProduct = (productId) => {
  return {
    type: DELETE_PRODUCT,
    productId: productId,
  };
};
