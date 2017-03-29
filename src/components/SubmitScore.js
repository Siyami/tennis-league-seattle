import React, { Component } from 'react';
import { Grid, FormGroup, ControlLabel, FormControl, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';

class SubmitScore extends Component {
  constructor(props) {
    super(props)

    this.state = {
      opponents: [],
      result: '',
      scoreDate: '',
      firstSet1: '',
      firstSet2: '',
      secondSet1: '',
      secondSet2: '',
      tieBreak1: '',
      tieBreak2: '',
      loggedInPlayerFirstName: '',
      loggedInPlayerLastName: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    axios.get('/api/players')
      .then((res) => {
        this.setState({
          opponents: res.data
        })
      })
      .catch((err) => {
        console.log(err);
      });
      this.setState({
        loggedInPlayerFirstName: cookie.load('playerFirstName'),
        loggedInPlayerLastName: cookie.load('playerLastName')
      })
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
        opponent: this.state.opponent,
        result: this.state.result,
        firstSet1: this.state.firstSet1,
        firstSet2: this.state.firstSet2,
        secondSet1: this.state.secondSet1,
        secondSet2: this.state.secondSet2,
        tieBreak1: this.state.tieBreak1,
        tieBreak2: this.state.tieBreak2,
        scoreDate: this.state.scoreDate,
        leagueId: 1
      }
    })
    .then((res) => {
      console.log(res.data);
      browserHistory.push('/viewscores')
    })
    .catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (
      <Grid>

        <Form onSubmit={this.handleSubmit} style={{margin: "5% 20%"}}>
          <h4>Please Submit Your Scores For Spring League</h4>
          <h4>{`${this.state.loggedInPlayerFirstName}  ${this.state.loggedInPlayerLastName} vs.`}</h4>

          <FormGroup controlId="formControlsSelect">
            {/* <ControlLabel>Select</ControlLabel> */}
            <FormControl
              componentClass="select"
              placeholder="select"
              onChange={this.handleChange}
              value={this.state.opponent}
              name="opponent">
              <option>Select Opponent</option>
              {this.state.opponents.map((opponent) => {
                return (
                  <option key={opponent.id}>{`${opponent.firstName} ${opponent.lastName}`}</option>
                )
              })}
            </FormControl>
          </FormGroup>

          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Result</ControlLabel>
            <FormControl
              componentClass="select"
              placeholder="select"
              onChange={this.handleChange}
              value={this.state.result}
              name="result">
              <option>Select Result</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
            </FormControl>
          </FormGroup>

          <FormGroup controlId="formInlineName">
            <ControlLabel>Select Match Date</ControlLabel>
            <FormControl
              type="date"
              name="scoreDate"
              onChange={this.handleChange}
              value={this.state.scoreDate}
            />
          </FormGroup>

          {/* SELECT OPTION FOR RECORDING SCORES */}

          {/* <FormGroup controlId="formControlsSelect">
            <ControlLabel>First Set</ControlLabel>
            <FormControl  componentClass="select"
              placeholder="select"
              onChange={this.handleChange}
              value={this.state.firstSet1}
              name="firstSet1">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="1">4</option>
              <option value="2">5</option>
              <option value="3">6</option>
            </FormControl>
            <FormControl  componentClass="select"
              placeholder="select"
              onChange={this.handleChange}
              value={this.state.firstSet2}
              name="firstSet2">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="1">4</option>
              <option value="2">5</option>
              <option value="3">6</option>
            </FormControl>
          </FormGroup> */}

          <FormGroup controlId="formInlineName">
            <ControlLabel>First Set</ControlLabel>
            <FormControl
              type="text"
              placeholder="0"
              name="firstSet1"
              onChange={this.handleChange}
              value={this.state.firstSet1}
            />
            <FormControl
              type="text"
              placeholder="0"
              name="firstSet2"
              onChange={this.handleChange}
              value={this.state.firstSet2}
            />
          </FormGroup>

          <FormGroup controlId="formInlineName">
            <ControlLabel>Second Set</ControlLabel>
            <FormControl
              type="text"
              placeholder="0"
              name="secondSet1"
              onChange={this.handleChange}
              value={this.state.secondSet1}
            />
            <FormControl
              type="text"
              placeholder="0"
              name="secondSet2"
              onChange={this.handleChange}
              value={this.state.secondSet2}
            />
          </FormGroup>

          <FormGroup controlId="formInlineName">
            <ControlLabel>Tie Break</ControlLabel>
            <FormControl
              type="text"
              name="tieBreak1"
              onChange={this.handleChange}
              value={this.state.tieBreak1}
            />
            <FormControl
              type="text"
              name="tieBreak2"
              onChange={this.handleChange}
              value={this.state.tieBreak2}
            />
          </FormGroup>

          <Button type="submit" bsStyle="primary">
            Submit Score
          </Button>

        </Form>

      </Grid>
    )
  }

}

export default SubmitScore;
