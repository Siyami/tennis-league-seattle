import React, { Component } from 'react';
import { Row,Grid, Form, FormGroup, Col, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';
import { browserHistory } from 'react-router';
import Validation from 'react-validation';
import './Validations';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const nextState = {
      [event.target.name]: event.target.value
    };

    this.setState(nextState);
  }

  handleSubmit(event) {
    event.preventDefault();

    axios({
      method: 'post',
      url: '/api/token',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        email: this.state.email,
        password: this.state.password
      },
       validateStatus: (status) => status < 500
     })
    .then((res) => {
      console.log(res.data);

      if(res.status < 400) {

        this.props.setStateFromLoginComponent()

        browserHistory.push('/')
      }
      else {
        alert(res.data)
      }

    })
    .catch((err) => {
      console.log(err);
    });

    // Reset the form
    this.setState({
      password: '',
      email: ''
    });
  }

  render() {
    return (
      <Grid>
        <Validation.components.Form>
          <Row>
            <Col xs={6} xsOffset={3}>
              <Form onSubmit={this.handleSubmit} horizontal style={{margin: "10% 20%"}}>
                <FormGroup controlId="formHorizontalEmail">
                  {/* <Col componentClass={ControlLabel} sm={2}>
                    Email
                  </Col> */}
                  <Validation.components.Input
                    validations={['required', 'email']}
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={this.handleChange}
                    value={this.state.email}
                  />
                </FormGroup>
                <FormGroup controlId="formHorizontalPassword">
                  {/* <Col componentClass={ControlLabel} sm={2}>
                    Password
                  </Col> */}
                  <Validation.components.Input
                    validations={['required', 'passwordLength']}
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={this.handleChange}
                    value={this.state.password}
                  />
                </FormGroup>
                <FormGroup>
                  <Button style={{width: "50%"}}bsSize="large" bsStyle="warning" type="submit">
                    Log in
                  </Button>
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </Validation.components.Form>
      </Grid>
    )
  }
}

export default Login;
