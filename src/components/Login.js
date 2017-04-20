import React, { Component } from 'react';
import { Row,Grid, Form, FormGroup, Col, Button } from 'react-bootstrap';
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
      if(res.status < 400) {
        this.props.setStateFromLoginComponent();
        browserHistory.push('/');
      }
      else {
        alert(res.data);
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
              <Form onSubmit={this.handleSubmit} horizontal style={{margin: "25% 10%" , textAlign: "center"}}>
                <FormGroup controlId="formHorizontalEmail">
                  <Validation.components.Input
                    style={{width: "50%"}}
                    validations={['required', 'email']}
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={this.handleChange}
                    value={this.state.email}
                  />
                </FormGroup>
                <FormGroup controlId="formHorizontalPassword">
                  <Validation.components.Input
                    style={{width: "50%"}}
                    validations={['required', 'passwordLength']}
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={this.handleChange}
                    value={this.state.password}
                  />
                </FormGroup>
                <Validation.components.Button bsStyle="primary" type="submit" className="button">
                  Log in
                </Validation.components.Button>
              </Form>
            </Col>
          </Row>
        </Validation.components.Form>
      </Grid>
    );
  }
}

export default Login;
