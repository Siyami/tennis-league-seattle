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
      // scores: [],
      unSortedPlayersAndScores: [],
      isButtonDisabled: false
    }

    this.joinLeague = this.joinLeague.bind(this);

  }

  // dedupe(arr) {
  //   return arr.reduce(function (p, c) {
  //     var key = [c.x, c.y].join('|');
  //     if (p.temp.indexOf(key) === -1) {
  //       p.out.push(c);
  //       p.temp.push(key);
  //     }
  //     return p;
  //   }, { temp: [], out: [] }).out;
  // }

  componentWillMount() {

    //  Get all player scores
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

/////////////////////////////////////////////
  // axios.get('/api/scores/1')
  //   .then((res) => {
  //     // console.log(res.data);
  //     this.setState({ unSortedPlayersAndScores: res.data })
  //
  //     this.state.unSortedPlayersAndScores.forEach((player) => {
  //       let won = 0;
  //       let lost = 0;
  //       let numOfMatches = 0;
  //       const newObj = {};
  //
  //       this.state.unSortedPlayersAndScores.forEach((user) => {
  //         if(player.id === user.id) {
  //
  //           numOfMatches++;
  //           if(user.result === 'Won') {
  //             won++;
  //           }
  //           else if (user.result === 'Lost') {
  //             lost++;
  //           }
  //
  //         }
  //       })
  //       newObj.firstName = player.firstName;
  //       newObj.lastName = player.lastName;
  //       newObj.wins = won;
  //       newObj.losses = lost;
  //       newObj.numOfMatches = numOfMatches;
  //       newObj.homeCourt = player.homeCourt;
  //       const newArr = [];
  //       newArr.push(newObj);
  //       // console.log(newObj);
  //       console.log(newArr);
  //       const arr = this.dedupe(newArr);
  //       // console.log(arr);
  //       this.setState({unSortedPlayersAndScores: newArr});
  //
  //
  //     })
  //     // console.log(this.state.unSortedPlayersAndScores);
  //
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   })
  }

  componentDidMount() {

    axios.get('/api/players_leagues/1')
     .then((res) => {
       console.log(res.data);
       this.setState({ playersInSpring2017: res.data })

       this.state.playersInSpring2017.forEach((player) => {

         // get loggedIn playerId from cookie that I created in token route
         const id = cookie.load('playerId');
        //  console.log(id);

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
    // var nodemailer = require("nodemailer");
    //
    // var smtpTransport = nodemailer.createTransport("SMTP",{
    //    service: "Gmail",  // sets automatically host, port and connection security settings
    //    auth: {
    //        user: "siyami.avci@gmail.com",
    //        pass: "enter password"
    //    }
    // });
    //
    // smtpTransport.sendMail({  //email options
    //    from: "Siyami <siyami.avci@gmail.com>", // sender address.  Must be the same as authenticated user if using Gmail.
    //    to: "Siyami <siyami.avci@gmail.com>", // receiver
    //    subject: "Emailing with nodemailer", // subject
    //    text: "Email Example with nodemailer" // body
    // }, function(error, response){  //callback
    //    if(error){
    //        console.log(error);
    //    }else{
    //        console.log("Message sent: " + response.message);
    //    }
    //
    //    smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
    // });

    const firstName = cookie.load('playerFirstName');
    const lastName = cookie.load('playerLastName');
    const homeCourt = cookie.load('playerHomeCourt');
    const email = cookie.load('playerEmail');

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
      // console.log(res.data);
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
          </thead>
          <tbody>
            {this.state.playersInSpring2017.map((player) => {
              let won = 0;
              let lost = 0;
              let numOfMatches = 0;
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
