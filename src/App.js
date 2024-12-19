import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Books from "./pages/Books";
import { books } from "./data";
import BookInfo from "./pages/BookInfo";
import Cart from "./pages/Cart";
import React, { useState } from "react";

function App() {
  const [cart, setCart] = useState([]);
  //Sales Tax Rate
  const salesTaxRate = 0.06725;

  function addToCart(book) {
    setCart([...cart, { ...book, quantity: 1 }]);
  }

  function removeItem(book) {
    setCart(cart.filter((item) => +item.id !== +book.id));
  }

  function changeQuantity(book, quantity) {
    setCart(
      cart.map((item) =>
        +item.id === +book.id ? { ...item, quantity: quantity } : item
      )
    );
  }

  function numberOfItems() {
    let counter = 0;
    cart.forEach((item) => {
      counter += +item.quantity;
    });
    return counter;
  }

  return (
    <Router>
      <div className="App">
        <Nav numberOfItems={numberOfItems()} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books books={books} />} />
          <Route
            path="/books/:id"
            element={
              <BookInfo books={books} addToCart={addToCart} cart={cart} />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                changeQuantity={changeQuantity}
                removeItem={removeItem}
                salesTaxRate={salesTaxRate}
              />
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
