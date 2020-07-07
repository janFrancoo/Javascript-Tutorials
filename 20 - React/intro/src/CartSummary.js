import React, { Component } from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
} from "reactstrap";
import { Link } from "react-router-dom";

export default class CartSummary extends Component {
  renderCart() {
    return (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          {this.props.cart.length}
        </DropdownToggle>
        <DropdownMenu right>
          {this.props.cart.map((item) => (
            <DropdownItem key={item.product.id}>
              {item.product.productName} -{" "}
              <Badge color="secondary">{item.quantity}</Badge>
              <Badge color="danger" onClick={() => this.props.removeFromCart(item.product)}>X</Badge>
            </DropdownItem>
          ))}
          <DropdownItem divider />
          <DropdownItem>
              <Link to="cart">Go to cart</Link>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }

  renderEmptyCart() {
      return (
          "Add something to cart"
      )
  }

  render() {
    return (
        <div>{this.props.cart.length > 0 ? this.renderCart() : this.renderEmptyCart()}</div>
    );
  }
}
