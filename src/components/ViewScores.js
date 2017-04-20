import React, { Component } from 'react';
import { Button, Grid, Table, Modal, Form, ControlLabel, FormGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import cookie from 'react-cookie';

class ViewScores extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scores: [],
      admin: cookie.load('admin'),
      showModal: false,
      opponent: '',
      result: '',
      firstSet1: '',
      firstSet2: '',
      secondSet1: '',
      secondSet2: '',
      tieBreak1: '',
      tieBreak2: '',
      scoreDate: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    axios.get('/api/players')
      .then((res) => {
        this.setState({
          opponents: res.data
        });
      })
      .catch((err) => {
        console.log(err);
      });

    axios.get('/api/combined_scores')
      .then((res) => {
        this.setState({
          scores: res.data
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChange(event) {
    const nextState = {
      [event.target.name]: event.target.value
    };
    this.setState(nextState);
  }

  handleSubmit(event, id) {
    event.preventDefault();
    console.log(id);

    axios({
      method: 'patch',
      url: `/api/scores/${id}`,
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
    })
    .catch((err) => {
      console.log(err);
    });
  }

  render() {
    let closeModal = () => this.setState({ showModal: false});

    return(
      <Grid>
        <h3 style={{color: "#15994c"}}>Submitted Scores for Spring League 2017</h3>
        <Table responsive striped condensed hover bordered>
          <thead style={{color: "#15994c"}}>
            <tr>
              <th>Player 1</th>
              <th>Player 2</th>
              <th>Score</th>
              <th>Date</th>
            </tr>
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
                  {/* {this.state.admin === 'true' ? (<Link to="/submitscore"><Button bsStyle="primary">Update</Button></Link>) : (null)} */}
                  {this.state.admin === 'true' ? (
                    <div className="modal-container">
                      <Button style={{margin: "0px 18% 0px 18%"}} bsStyle="primary" bsSize="small" onClick={() => this.setState({ showModal: true})}>Update</Button>
                        <Modal show={this.state.showModal} onHide={closeModal} container={this} aria-labelledby="contained-modal-title">
                          <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title">Update Score</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <Form onSubmit={(e) => this.handleSubmit(e, score.scoreId)} style={{margin: "3% 30%", color: "#20994c"}}>
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
                                    );
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

                              <FormGroup style={{textAlign: "center"}}>
                                <Button style={{marginRight: "5px"}} type="submit" bsStyle="primary" onClick={closeModal}>Update</Button>
                                <Button bsStyle="danger" onClick={closeModal}>Cancel</Button>
                              </FormGroup>
                            </Form>
                          </Modal.Body>
                        </Modal>
                    </div>
                  ) : (null)}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Grid>
    );
  }
}

export default ViewScores;
