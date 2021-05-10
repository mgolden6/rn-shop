class CartItem {
  constructor(quantity, ownerPushToken, productTitle, productPrice, sum) {
    this.quantity = quantity;
    this.ownerPushToken = ownerPushToken;
    this.productTitle = productTitle;
    this.productPrice = productPrice;
    this.sum = sum;
  }
}

export default CartItem;
