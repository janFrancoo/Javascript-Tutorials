import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import alertify from "alertifyjs";

export default class DemoForm extends Component {
  state = {
    email: "",
    password: "",
    desc: "",
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    alertify.success("A verification e-mail is sent to " + this.state.email, 6);
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input
            type="email"
            name="email"
            id="exampleEmail"
            placeholder="Enter a valid e-mail address"
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input
            type="password"
            name="password"
            id="examplePassword"
            placeholder="Enter password"
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleText">Description</Label>
          <Input
            type="textarea"
            name="desc"
            id="exampleText"
            onChange={this.handleChange}
          />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}
