import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cartActions from "../../redux/actions/cartActions";
import { Link } from "react-router-dom"
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
} from "reactstrap";

class CartSummary extends Component {
  render() {
    return (
      <div>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
            Cart
          </DropdownToggle>
          <DropdownMenu right>
            {this.props.cart.map((cartItem) => (
              <DropdownItem key={cartItem.product.id}>
                {cartItem.product.productName} -{" "}
                <Badge color="secondary">{cartItem.quantity}</Badge> - 
                <Badge color="danger" onClick={() => this.props.actions.removeFromCart(cartItem.product)}>X</Badge>
              </DropdownItem>
            ))}
            <DropdownItem divider />
            <Link to={"/cart"}><DropdownItem>Cart Detail</DropdownItem></Link>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cartReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartSummary);
