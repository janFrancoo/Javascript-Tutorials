import React, { Component } from "react";
import Navi from "./Navi";
import CatList from "./CatList";
import ProductList from "./ProductList";
import { Container, Row, Col } from "reactstrap";
import alertify from "alertifyjs";
import { Switch, Route } from "react-router-dom";
import NotFound from "./NotFound";
import CartList from "./CartList";
import Form from "./Form";

export default class App extends Component {
  categoryInfo = {
    title: "Category List",
  };

  productInfo = {
    title: "Product List",
  };

  changeCategory = (category) => {
    this.setState({ currentCat: category.categoryName });
    this.getProducts(category.id);
  };

  state = {
    currentCat: "Beverages",
    products: [],
    cart: [],
  };

  componentDidMount() {
    this.getProducts();
  }

  getProducts = (id) => {
    let url = "http://localhost:3000/products?categoryId=";
    if (id) url += id;
    else url += 1;
    fetch(url)
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          products: data,
        })
      );
  };

  addToCart = (product) => {
    const cart = this.state.cart;
    const item = cart.find((p) => p.product.id === product.id);
    if (item) {
      item.quantity += 1;
    } else {
      cart.push({
        product: product,
        quantity: 1,
      });
    }

    this.setState({
      cart: cart,
    });

    alertify.success(product.productName + " is added to cart!", 3);
  };

  removeFromCart = (product) => {
    const newCart = this.state.cart.filter(
      (item) => item.product.id !== product.id
    );
    this.setState({
      cart: newCart,
    });

    alertify.error(product.productName + " is removed from cart!", 3);
  };

  render() {
    return (
      <div>
        <Container>
          <Navi cart={this.state.cart} removeFromCart={this.removeFromCart} />
          <Row>
            <Col xs="3">
              <CatList
                currentCat={this.state.currentCat}
                changeCat={this.changeCategory}
                info={this.categoryInfo}
              />
            </Col>
            <Col xs="9">
              <Switch>
                <Route
                  exact
                  path="/"
                  render={props => (
                    <ProductList
                      {...props}
                      addToCart={this.addToCart}
                      products={this.state.products}
                      currentCat={this.state.currentCat}
                      info={this.productInfo}
                    />
                  )}
                />
                <Route exact path="/cart" render={props => (
                  <CartList 
                    {...props}
                    removeFromCart={this.removeFromCart}
                    cart={this.state.cart}
                  />
                )} />
                <Route path="/form" component={Form} />
                <Route component={NotFound} />
              </Switch>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
