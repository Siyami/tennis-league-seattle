import React, { Component } from 'react';
import { Row, Grid, FormGroup, Button, Col, Form, FormControl } from 'react-bootstrap';
import axios from 'axios';
import { browserHistory } from 'react-router';
import Validation from 'react-validation';
import './Validations';

class SignUp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      ntrpRating: '',
      homeCourt: '',
      picUrl: '',
      admin: false,
      errors: {}
    }

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
      url: '/api/players',
      data: {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        ntrpRating: this.state.ntrpRating,
        homeCourt: this.state.homeCourt,
        picUrl: this.state.picUrl,
        admin: this.state.admin
      }
    })
    .then((res) => {

      this.props.setStateFromLoginComponent()
      console.log(res);
      browserHistory.push('/')
    })
    .catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (
      <Validation.components.Form>
        <Grid>
          <Row>
            <Col xs={6} xsOffset={3}>
              <Form onSubmit={this.handleSubmit} horizontal style={{margin: "10% 20%", textAlign: "center"}}>
                <FormGroup controlId="formHorizontalEmail">
                    <Validation.components.Input
                      style={{width: "70%"}}
                      validations={['required', 'firstName']}
                      name="firstName"
                      type="text"
                      placeholder="First Name"
                      onChange={this.handleChange}
                      value={this.state.firstName}
                    />
                </FormGroup>
                <FormGroup controlId="formHorizontalEmail">
                    <Validation.components.Input
                      style={{width: "70%"}}
                      validations={['required', 'lastName']}
                      name="lastName"
                      type="text"
                      placeholder="Last Name"
                      onChange={this.handleChange}
                      value={this.state.lastName}
                    />
                </FormGroup>
                <FormGroup controlId="formHorizontalEmail">
                    <Validation.components.Input
                      style={{width: "70%"}}
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
                      style={{width: "70%"}}
                      validations={['required', 'passwordLength']}
                      type="password"
                      placeholder="Password"
                      name="password"
                      onChange={this.handleChange}
                      value={this.state.password}
                    />
                </FormGroup>
                <FormGroup>
                    <Validation.components.Input
                      style={{width: "70%"}}
                      validations={['required']}
                      name="ntrpRating"
                      type="text"
                      placeholder="NTRP Rating"
                      onChange={this.handleChange}
                      value={this.state.ntrpRating}
                    />
                </FormGroup>
                <FormGroup>
                    <Validation.components.Input
                      style={{width: "70%"}}
                      validations={['required']}
                      name="homeCourt"
                      type="text"
                      placeholder="Home Court"
                      onChange={this.handleChange}
                      value={this.state.homeCourt}
                    />
                </FormGroup>
                <FormGroup>
                    <Validation.components.Input
                      style={{width: "70%"}}
                      validations={['required']}
                      name="picUrl"
                      type="text"
                      placeholder="Picture Url"
                      onChange={this.handleChange}
                      value={this.state.picUrl}
                    />
                </FormGroup>
                <Validation.components.Button type="submit" className="button" style={{textAlign: "center"}}>
                  Sign Up
                </Validation.components.Button>
                <div style={{textAlign: "center", margin: "5% 20%"}}>
                  <a onClick={() => {browserHistory.push('/login')}}>Already have an account? Click to Log In</a>
                </div>
              </Form>
            </Col>
          </Row>
        </Grid>
    </Validation.components.Form>
    );
  }
}

export default SignUp;
