import React, { Component } from 'react';
import { Table, Grid, Button } from 'react-bootstrap';
import axios from 'axios';
import cookie from 'react-cookie';
import { browserHistory, Link } from 'react-router';

class SpringLeague extends Component {
  constructor(props) {
    super(props)

    this.state = {
      playersInSpring2017: [],
      unSortedPlayersAndScores: [],
      isButtonDisabled: false,
      admin: cookie.load('admin')
    }
    this.joinLeague = this.joinLeague.bind(this);
  }

  componentWillMount() {
    //  Get all player scores
    axios.get('/api/combined_scores')
      .then((res) => {
        this.setState({
         scores: res.data
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  componentDidMount() {
    axios.get('/api/players_leagues/1')
     .then((res) => {
       this.setState({ playersInSpring2017: res.data })

       this.state.playersInSpring2017.forEach((player) => {

         // get loggedIn playerId & admin from cookies I created in token route
         const id = cookie.load('playerId');

         // if logged in players id is in players_leagues table then disable join league button
         if (player.playerId == id) {
           this.setState({ isButtonDisabled: true })
         }
       })
     })
     .catch((err) => {
       console.log(err);
     })
  }

  joinLeague() {
    const firstName = cookie.load('playerFirstName');
    const email = cookie.load('playerEmail');
    const lastName = cookie.load('playerLastName');
    const homeCourt = cookie.load('playerHomeCourt');

    this.setState({ isButtonDisabled: true })

    // Send welcome email when player joins the league
    axios.post('/api/emails', {
      playerEmail: `${email}`,
      playerFirstName: `${firstName}`,
      html: '<h2>Thanks for joining Spring League 2017</h2><p>League started on March 20th, 2017</p><p>League is going to end on June 4th, 2017</p><p>Enjoy the league and please let us know if you have any questions!</p>'
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })

    this.setState({
      playersInSpring2017: this.state.playersInSpring2017.concat(
        [{
          firstName: firstName,
          lastName: lastName,
          email: email,
          homeCourt: homeCourt
        }]
      )})

    axios({
      method: 'post',
      url: '/api/players_leagues',
      data: {
        leagueId: 1
      }
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render() {
    let isButtonDisabled = this.state.isButtonDisabled;

    return (
      <Grid>
        <h3>Spring 2017 Tennis League</h3>
        <h5>League started on 3/20/2017</h5>
        <h5>League is going to end on 6/4/2017</h5>
        <Button onClick={this.joinLeague} bsStyle="primary" disabled={isButtonDisabled}>Join League</Button>

        <Table responsive striped condensed hover bordered>
          <thead>
            <tr>
              <th>Player Name</th>
              <th>W/L</th>
              <th>Home Court</th>
              <th>Total Matches</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {this.state.playersInSpring2017.map((player) => {
              let won = 0;
              let lost = 0;
              let numOfMatches = 0;
              return (
                <tr key={player.email}>
                  <td>{`${player.firstName} ${player.lastName}`}</td>
                  <td>{this.state.scores.forEach((score) => {

                    // Check if player submitted any scores in this league
                    if (score.playerId === player.playerId) {
                      numOfMatches++;
                      if(score.result === 'Won') {
                        won++;
                      }
                      else if (score.result === 'Lost') {
                        lost++;
                      }
                    }
                  })}{`Wins: ${won} Losses: ${lost}`}</td>
                  <td>{player.homeCourt}</td>
                  <td>{numOfMatches}</td>
                  <td>{player.email}</td>
                  {this.state.admin === 'true' ? (<Link to="/submitscore"><Button bsStyle="primary">Update</Button></Link>) : (null)}
                </tr>
              )
            })}
          </tbody>
        </Table>

      </Grid>
    )
  }
}

export default SpringLeague;
