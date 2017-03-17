import React, { Component } from 'react';
import { Grid, FormGroup, ControlLabel, FormControl, Form, Button } from 'react-bootstrap';
import axios from 'axios';

class SubmitScore extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loggedInPlayer: '',
      won: false,
      lost: false,
      score: '',
      scoreDate: '',
      opponent: 'si'
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    console.log(this.state.opponent);
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
      url: '/api/scores',
      data: {
        opponent: this.state.opponent
      }
    })
    .then((res) => {
      // this.props.setStateFromLoginComponent()
      console.log(res);
      // browserHistory.push('/')
    })
    .catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (
      <Grid>
        {this.state.opponent === null ? (
            <div>hello</div>
          ) : (
            <div>Hi</div>
          )
        }


        {/* {this.state.isLoggedIn ? (
          <Nav pullRight>
            <NavItem eventKey={1} onClick={this.logOut}>Sign Out</NavItem>
          </Nav>

        ) : (
          <Nav pullRight>
            <NavItem eventKey={1} onClick={() => {browserHistory.push('/login')}}>Log In</NavItem>
            <NavItem eventKey={2} onClick={() => {browserHistory.push('/signup')}}>Sign Up</NavItem>
          </Nav>
        )
      } */}






        <Form onSubmit={this.handleSubmit} style={{margin: "10% 20%"}}>
          loggedInPlayer vs
          <FormGroup controlId="formControlsSelect">
            {/* <ControlLabel>Select</ControlLabel> */}
            <FormControl componentClass="select">
              <option value="select">Select Opponent</option>
              <option
                value="Andre Aggasi"
                name="Andre Aggasi"
                onChange={this.handleChange}
                >
                Andre Aggasi
              </option>
              <option value="Roger Federer">Roger Federer</option>
            </FormControl>
          </FormGroup>

          <FormGroup controlId="formInlineName">
            <ControlLabel>First Set</ControlLabel>
            <FormControl type="text" placeholder="6" />
            <FormControl type="text" placeholder="4" />
          </FormGroup>

          <FormGroup controlId="formInlineName">
            <ControlLabel>Second Set</ControlLabel>
            <FormControl type="text" placeholder="2" />
            <FormControl type="text" placeholder="6" />
          </FormGroup>

          <FormGroup controlId="formInlineName">
            <ControlLabel>Tie Break</ControlLabel>
            <FormControl type="text" />
            <FormControl type="text" />
          </FormGroup>

          <Button type="submit">
            Submit Score
          </Button>

        </Form>

      </Grid>
    )
  }

}

export default SubmitScore;
