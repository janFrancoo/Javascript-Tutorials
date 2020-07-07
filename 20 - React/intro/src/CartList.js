import React, { Component } from "react";
import { Table, Badge, Button } from "reactstrap";

export default class CartList extends Component {
  renderCart() {
    return (
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Quantity</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {
            this.props.cart.map(item => (
                <tr key={item.product.id}>
                    <th scope="row">{item.product.id}</th>
                    <td>{item.product.productName}</td>
                    <td><Badge color="secondary">{item.quantity}</Badge></td>
                    <td><Button color="danger" size="sm" onClick={() => this.props.removeFromCart(item.product)}>X</Button></td>
                </tr>
            ))
        }
        </tbody>
      </Table>
    );
  }

  renderEmptyCart() {
      return (
          "Empty cart"
      )
  }

  render() {
  return <div>{this.props.cart.length > 0 ? this.renderCart() : this.renderEmptyCart()}</div>;
  }
}
