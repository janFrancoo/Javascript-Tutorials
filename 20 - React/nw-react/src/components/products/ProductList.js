import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Table, Button } from "reactstrap";
import * as cartActions from "../../redux/actions/cartActions"
import alertify from "alertifyjs"
import { Link } from "react-router-dom"

class ProductList extends Component {
    addItemToCart(product) {
        this.props.actions.addToCart({
            quantity: 1,
            product
        })
        alertify.success(product.productName + " is added to cart!", 3)
    }

  render() {
    return (
      <div>
        <h2>Products - {this.props.currentCategory.categoryName}</h2>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Stock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
                this.props.products.map(product => (
                    <tr key={product.id}>
                        <th scope="row">{product.id}</th>
                        <td><Link to={"/save-product/" + product.id}>{product.productName}</Link></td>
                        <td>{product.quantityPerUnit}</td>
                        <td>{product.unitPrice}</td>
                        <td>{product.unitsInStock}</td>
                        <td><Button color="info" onClick={() => this.addItemToCart(product)}>Add</Button>{' '}</td>
                    </tr>
                ))
            }
          </tbody>
        </Table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentCategory: state.changeCategoryReducer,
    products: state.productListReducer,
  };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            addToCart: bindActionCreators(cartActions.addToCart, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
