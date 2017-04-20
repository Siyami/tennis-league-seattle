import React, { Component } from 'react';
import { Table, Grid, Button } from 'react-bootstrap';
import axios from 'axios';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';

class SummerLeague extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playersInSummer2017: [],
      unSortedPlayersAndScores: [],
      isButtonDisabled: false,
      playerId: cookie.load('playerId')
    };
    this.joinLeague = this.joinLeague.bind(this);
  }

  componentDidMount() {
    axios.get('/api/players_leagues/2')
     .then((res) => {
       this.setState({ playersInSummer2017: res.data });

       this.state.playersInSummer2017.forEach((player) => {

         // get loggedIn playerId from cookie that I created in token route
         const id = cookie.load('playerId');

         // if logged in players id is in players_leagues table then disable join league button
         if (player.playerId == id) {
           this.setState({ isButtonDisabled: true });
         }

       });
     })
     .catch((err) => {
       console.log(err);
     });
  }

  joinLeague() {
    const firstName = cookie.load('playerFirstName');
    const email = cookie.load('playerEmail');
    const lastName = cookie.load('playerLastName');
    const homeCourt = cookie.load('playerHomeCourt');

    this.setState({ isButtonDisabled: true });

    // Join league
    axios({
      method: 'post',
      url: '/api/players_leagues',
      data: {
        leagueId: 2
      },
      validateStatus: (status) => status < 500
    })
    .then((res) => {
      if(res.status >= 400) {
        alert(res.data + ', Please Log In or Sign Up to Join a League');
        browserHistory.push('/signup');
      }
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

    // Send welcome email when player joins the league
    axios.post('/api/emails', {
      playerEmail: `${email}`,
      playerFirstName: `${firstName}`,
      // text: 'Thanks!',
      html: '<h2>Thanks for joining Summer League 2017</h2><p>League starts on 6/5/2017</p><p>League ends on 8/20/2017</p><p>Enjoy the league and please let us know if you have any questions!</p>'
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });

    if(this.state.playerId) {
      this.setState({
        playersInSummer2017: this.state.playersInSummer2017.concat(
          [{
            firstName: firstName,
            lastName: lastName,
            email: email,
            homeCourt: homeCourt
          }]
        )});
    }
  }

  render() {
    let isButtonDisabled = this.state.isButtonDisabled;

    return (
      <Grid>
        <h3>Summer 2017 Tennis League</h3>
        <h5>League starts on 6/5/2017</h5>
        <h5>League ends on 8/20/2017</h5>
        <Button onClick={this.joinLeague} bsStyle="primary" disabled={isButtonDisabled} style={{marginBottom: "10px"}}>Join League</Button>
        <Table responsive striped condensed hover bordered>
          <thead style={{color: "#15994c"}}>
            <tr>
              <th>Player Name</th>
              <th>W/L</th>
              <th>Home Court</th>
              <th>Total Matches</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {this.state.playersInSummer2017.map((player) => {
              return (
                <tr key={player.email}>
                  <td>{`${player.firstName} ${player.lastName}`}</td>
                  <td>Wins: 0 Losses: 0</td>
                  <td>{player.homeCourt}</td>
                  <td>0</td>
                  <td>{player.email}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Grid>
    );
  }
}

export default SummerLeague;
