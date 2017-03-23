import React, { Component } from 'react';
import { Table, Grid, Button } from 'react-bootstrap';
import axios from 'axios';
import cookie from 'react-cookie';
// import browserHistory from 'react-router';

class SpringLeague extends Component {
  constructor(props) {
    super(props)

    this.state = {
      playersInSpring2017: [],
      scores: [],
      isButtonDisabled: false
    }

    this.joinLeague = this.joinLeague.bind(this);

  }

  componentWillMount() {
    axios.get('/api/players_leagues/1')
     .then((res) => {
       console.log(res.data);
       this.setState({ playersInSpring2017: res.data })

       this.state.playersInSpring2017.forEach((player) => {

         // get loggedIn playerId from cookie that I created in token route
         const id = cookie.load('playerId');
         console.log(id);

         // if logged in players id is in players_leagues table then disable join league button
         if (player.playerId == id) {
           this.setState({ isButtonDisabled: true })
         }

       })

     })
     .catch((err) => {
       console.log(err);
     })

     // Get all player scores
    axios.get('/api/combined_scores')
      .then((res) => {
        // console.log(res.data);
        this.setState({
         scores: res.data
        })
      })
      .catch((err) => {
        console.log(err);
      })


       ///////// /////////////////////

    axios.get('/api/scores/1')
    .then((res) => {
      console.log(res.data);
      // this.setState({ playersInSpring2017: res.data })

      // this.state.playersInSpring2017.forEach((player) => {
      //
      //   // get loggedIn playerId from cookie that I created in token route
      //   const id = cookie.load('playerId');
      //   console.log(id);
      //
      //   // if logged in players id is in players_leagues table then disable join league button
      //   if (player.playerId == id) {
      //     this.setState({ isButtonDisabled: true })
      //   }
      //
      // })

    })
    .catch((err) => {
      console.log(err);
    })
  }

  joinLeague() {
    axios({
      method: 'post',
      url: '/api/players_leagues',
      data: {
        leagueId: 1
      }
    })
    .then((res) => {
      console.log(res.data);
      // this.setState({ playersInSpring2017: playersInSpring2017.concat(res) })
      // browserHistory.push('/submitscore')
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render() {
    let isButtonDisabled = this.state.isButtonDisabled;

    // let won = 0;
    // let lost = 0;
    // let numOfMatches = 0;
    //
    // this.state.playersInSpring2017.forEach((player) => {
    //   // player.ratio = won/numOfMatches;
    //
    //   this.state.scores.forEach((score) => {
    //
    //     // Check if player submitted any scores in this league
    //     if (score.playerId === player.playerId) {
    //       numOfMatches++;
    //       if(score.result === 'Won') {
    //         won++;
    //       }
    //       else if (score.result === 'Lost') {
    //         lost++;
    //       }
    //     }
    //   })
    // })
    //
    // console.log(`Won: ${won}`);
    // console.log(`Lost: ${lost}`);
    // console.log(`Total Matches: ${numOfMatches}`);

    return (
      <Grid>
        <h3>Spring 2017 Tennis League</h3>
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
            <div></div>
          </thead>
          <tbody>
            {this.state.playersInSpring2017.map((player) => {
              let won = 0;
              let lost = 0;
              let numOfMatches = 0;
              // player.ratio = won/numOfMatches;
              return (
                <tr>
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
