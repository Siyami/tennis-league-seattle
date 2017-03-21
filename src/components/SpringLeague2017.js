import React, { Component } from 'react';
import { Table, Grid } from 'react-bootstrap';
import axios from 'axios';

class SpringLeague extends Component {
  constructor(props) {
    super(props)

    this.state = {
      playersInSpring2017: []
    }

  }

  componentWillMount() {
    axios.get('/api/players_leagues/3')
     .then((res) => {
       console.log(res.data);
       this.setState({ playersInSpring2017: res.data })
     })
     .catch((err) => {
       console.log(err);
     })
  }

  render() {
    return (
      <Grid>
        {/* <h3>{this.state.playersInSpring2017[0].leagueName}</h3> */}
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
