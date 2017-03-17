import React, { Component } from 'react';
import { Row, Grid, FormGroup, Button, Col, Form, FormControl } from 'react-bootstrap';
import axios from 'axios';
import { browserHistory } from 'react-router';

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
      admin: false
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
      <Grid>
        <Row>
          <Col xs={6} xsOffset={3}>
            <Form onSubmit={this.handleSubmit} horizontal style={{margin: "10% 20%"}}>

              <FormGroup controlId="formHorizontalEmail">
                {/* <Col componentClass={ControlLabel} sm={2}>
                  First Name
                </Col> */}

                  <FormControl
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    onChange={this.handleChange}
                    value={this.state.firstName}
                  />
              </FormGroup>

              <FormGroup controlId="formHorizontalEmail">
                {/* <Col componentClass={ControlLabel} sm={2}>
                  Last Name
                </Col> */}
                  <FormControl
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    onChange={this.handleChange}
                    value={this.state.lastName}
                  />
              </FormGroup>

              <FormGroup controlId="formHorizontalEmail">
                {/* <Col componentClass={ControlLabel} sm={2}>
                  Email
                </Col> */}
                  <FormControl
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
                  <FormControl
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={this.handleChange}
                    value={this.state.password}
                  />
              </FormGroup>

              <FormGroup>
                {/* <Col componentClass={ControlLabel} sm={2}>
                  Last Name
                </Col> */}
                  <FormControl
                    name="ntrpRating"
                    type="text"
                    placeholder="NTRP Rating"
                    onChange={this.handleChange}
                    value={this.state.ntrpRating}
                  />
              </FormGroup>

              <FormGroup>
                {/* <Col componentClass={ControlLabel} sm={2}>
                  Last Name
                </Col> */}
                  <FormControl
                    name="homeCourt"
                    type="text"
                    placeholder="Home Court"
                    onChange={this.handleChange}
                    value={this.state.homeCourt}
                  />
              </FormGroup>

              <FormGroup>
                {/* <Col componentClass={ControlLabel} sm={2}>
                  Last Name
                </Col> */}
                  <FormControl
                    name="picUrl"
                    type="text"
                    placeholder="Picture Url"
                    onChange={this.handleChange}
                    value={this.state.picUrl}
                  />
              </FormGroup>

              <FormGroup>
                  <Button style={{width: "50%"}}bsSize="large" bsStyle="warning" type="submit">
                    Sign Up
                  </Button>
              </FormGroup>

            </Form>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default SignUp;
