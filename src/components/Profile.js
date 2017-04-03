import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import { Grid, Row, Col, Thumbnail, Table } from 'react-bootstrap';

class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      player: {},
      playerScores: []
    }
  }

  componentWillMount() {

    // get loggedIn playerId from cookie that I created in token route
    const playerId = cookie.load('playerId');

    // Get loggedIn player's info
    axios.get(`/api/players/${playerId}`)
     .then((res) => {
       this.setState({
         player: res.data
       })
     })
     .catch((err) => {
       console.log(err);
     })

     // Get loggedIn player's scores
     axios.get(`/api/combined_scores/${playerId}`)
      .then((res) => {
        this.setState({playerScores: res.data})
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} md={4} mdOffset={3} >
            <h2>Profile</h2>
            <Thumbnail src={this.state.player.picUrl} alt="242x200">
              <h3>{`${this.state.player.firstName} ${this.state.player.lastName}`}</h3>
              <p>Email: {this.state.player.email}</p>
              <p>Ntrp Level: {this.state.player.ntrpRating}</p>
              <p>Home Court: {this.state.player.homeCourt}</p>
            </Thumbnail>
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={6} mdOffset={2} >
            <Table responsive striped condensed hover bordered>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Match Between</th>
                  <th>Result</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {this.state.playerScores.map((score) => {
                  return (
                    <tr>
                      <td>{score.scoreDate}</td>
                      <td>{`${score.firstName} ${score.lastName} vs. ${score.opponent}`}</td>
                      <td>{score.result}</td>
                      <td>
                        {`${score.firstSet1}-${score.firstSet2} / ${score.secondSet1}-${score.secondSet2}`} {score.tieBreak1.length > 0 ? (`/ ${score.tieBreak1}-${score.tieBreak2}`) : null}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>

          </Col>
        </Row>
      </Grid>
    )
  }
}

export default Profile;
