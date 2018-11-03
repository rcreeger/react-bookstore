import React, { Component } from "react";
import "./App.css";
import TopNav from "./components/TopNav";
import BookList from "./components/BookList";
import Cart from "./components/Cart";
import axios from "axios";

class App extends Component {
  state = {
    books: []
  };

  booksInCart = () => this.state.books.filter(book => book.inCart);

  componentDidMount() {
    fetch(`http://localhost:8082/api/books`)
      .then(res => res.json())
      .then(books => this.setState({ books }));
  }

  addBookToCart = id => {
    axios.patch(`http://localhost:8082/api/books/cart/add/${id}`).then(res => {
      let theOtherBooks = this.state.books.filter(book => book.id != id);
      this.setState({ books: [...theOtherBooks, res.data] });
    });
  };

  removeBookFromCart = id => {
    axios
      .patch(`http://localhost:8082/api/books/cart/remove/${id}`)
      .then(res => {
        let theOtherBooks = this.state.books.filter(book => book.id != id);
        this.setState({ books: [...theOtherBooks, res.data] });
      });
  };

  render() {
    return (
      <div className="App">
        <TopNav />
        <div className="row">
          <div className="col">
            <BookList
              books={this.state.books}
              addBookToCart={this.addBookToCart}
            />
          </div>
          <div className="col">
            <Cart removeBookFromCart={this.removeBookFromCart} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
