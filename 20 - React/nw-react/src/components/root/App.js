import React from 'react';
import Navi from "../navi/Navi"
import Dashboard from './Dashboard';
import { Container } from "reactstrap"

function App() {
  return (
    <div>
      <Navi />
      <Container>
        <Dashboard />
      </Container>
    </div>
  );
}

export default App;
