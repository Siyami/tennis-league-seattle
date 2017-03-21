import React, { Component } from 'react';
import { Grid, Table } from 'react-bootstrap';
import axios from 'axios';

class ViewScores extends Component {
  constructor(props) {
    super(props)

    this.state = {
      scores: []
    }
  }

  componentWillMount() {
    axios.get('/api/combined_scores')
      .then((res) => {
        console.log(res.data);
        this.setState({
          scores: res.data
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render() {
    return(
      <Grid>
        <h3>Submitted Scores</h3>
        <Table responsive striped condensed hover bordered>
          <thead>
            <tr>
              <th>Player 1</th>
              <th>Player 2</th>
              <th>Score</th>
              <th>Date</th>
            </tr>
            <div></div>
          </thead>
          <tbody>
            {this.state.scores.map((score) => {
              return (
                <tr>
                  <td>{`${score.firstName} ${score.lastName}`}</td>
                  <td>{score.opponent}</td>
                  <td>
                    {`${score.firstSet1}-${score.firstSet2} / ${score.secondSet1}-${score.secondSet2}`} {score.tieBreak1.length > 0 ? (`/ ${score.tieBreak1}-${score.tieBreak2}`) : (null)}
                  </td>
                  <td>{score.scoreDate}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Grid>
    )
  }
}

export default ViewScores;
