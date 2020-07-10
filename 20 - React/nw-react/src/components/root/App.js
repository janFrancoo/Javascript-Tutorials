import React from "react";
import Navi from "../navi/Navi";
import Dashboard from "./Dashboard";
import CartDetail from "../cart/CartDetail";
import AddOrUpdateProdct from "../products/AddOrUpdateProduct"
import { Container } from "reactstrap";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <Navi />
      <Container>
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/cart" exact component={CartDetail} />
          <Route path="/save-product/:productId" component={AddOrUpdateProdct} />
          <Route path="/save-product" component={AddOrUpdateProdct} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
