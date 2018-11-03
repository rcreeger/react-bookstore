import React from "react";
import CartItem from "./CartItem";

const Cart = props => {
  let listOfCartItems = props.booksInCart.map(item => (
    <CarItem
      key={item.id}
      item={item}
      removeBookFromCart={props.removeBookFromCart}
    />
  ));
  let theTotal = props.booksInCart.reduce((acc, item) => acc + item.price, 0);
  return (
    <div>
      {listOfCartItems}
      Total (with tax): {theTotal}
    </div>
  );
};

export default Cart;
