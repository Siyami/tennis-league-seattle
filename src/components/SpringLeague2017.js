import React, { Component } from 'react';
import { Table, Grid, Button } from 'react-bootstrap';
import axios from 'axios';

class SpringLeague extends Component {
  constructor(props) {
    super(props)

    this.state = {
      playersInSpring2017: []
    }

    this.joinLeague = this.joinLeague.bind(this);

  }

  componentWillMount() {
    axios.get('/api/players_leagues/1')
     .then((res) => {
       console.log(res.data);
       this.setState({ playersInSpring2017: res.data })
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
    })
    .catch((err) => {
      console.log(err);
    })

  }

  render() {
    return (
      <Grid>
        {/* <h3>{this.state.playersInSpring2017[0].leagueName}</h3> */}
        <Button onClick={this.joinLeague} bsStyle="primary">Join League</Button>

        <Table responsive striped condensed hover bordered>
          <thead>
            <tr>
              <th>Player Name</th>
              <th>W/L</th>
              <th>Home Court</th>
              <th>Num of Matched Played</th>
              <th>Email</th>
            </tr>
            <div></div>
          </thead>
          <tbody>
            {this.state.playersInSpring2017.map((player) => {
              return (
                <tr>
                  <td>{`${player.firstName} ${player.lastName}`}</td>
                  <td></td>
                  <td>{player.homeCourt}</td>
                  <td></td>
                  <td>{player.email}</td>
                </tr>
              )
            })}
            {/* {this.state.playerScores.map((score) => {
              return (
                <tr>
                  <td>{score.scoreDate}</td>
                  <td>{`${score.firstName} ${score.lastName} vs. ${score.opponent}`}</td>
                  <td>{score.result}</td>
                  <td>
                    {`${score.firstSet1}-${score.firstSet2} / ${score.secondSet1}-${score.secondSet2}`} {score.tieBreak1.length > 0 ? (`/ ${score.tieBreak1}-${score.tieBreak2}`) : (<td></td>)}
                  </td>
                </tr>
              )
            })} */}
          </tbody>
        </Table>
      </Grid>
    )
  }

}

export default SpringLeague;
