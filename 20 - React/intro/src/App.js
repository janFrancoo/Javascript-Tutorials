import React, { Component } from 'react';
import Navi from './Navi';
import CatList from './CatList';
import ProductList from './ProductList';
import { Container, Row, Col } from 'reactstrap';

export default class App extends Component {
  categoryInfo = {
    title: "Category List"
  }

  productInfo = {
    title: "Product List"
  }

  changeCategory = (category) => {
    this.setState({ currentCat: category.categoryName })
  }

  state = {
    currentCat: ""
  }

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Navi/>
          </Row>
          <Row>
            <Col xs="3">
              <CatList currentCat={ this.state.currentCat } changeCat={ this.changeCategory } info={ this.categoryInfo }/>
            </Col>
            <Col xs="9">
              <ProductList currentCat={ this.state.currentCat } info={ this.productInfo }/>
            </Col>
          </Row>
        </Container>
      </div>
    ); 
  }
}
