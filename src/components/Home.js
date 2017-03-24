import React, { Component } from 'react';
import { Grid, Carousel, Jumbotron, Button } from 'react-bootstrap';

class Home extends Component {
  render() {
    return (
      <Grid>
        <Jumbotron>
          <h3>Welcome to TennisSeattle!</h3>
          <ul>
            <li>Join tennis leagues</li>
            <li>Play matches</li>
            <li>Meet new people!</li>
          </ul>
          {/* <p>Welcome to TennisSeattle where you can join tennis leagues, play matches and meet new people!</p> */}
          <p><Button bsStyle="primary">Learn more</Button></p>
        </Jumbotron>

        <Carousel>
          <Carousel.Item>
            <img width={900} height={500} alt="900x500" src="tennis5.jpg"/>
            <Carousel.Caption>
              <h3>Welcome to TennisSeattle</h3>
              {/* <p></p> */}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img width={900} height={500} alt="900x500" src="tennis1.jpg"/>
            <Carousel.Caption>
              <h3>Play Matches</h3>
              <p></p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img width={900} height={500} alt="900x500" src="tennis3.jpg"/>
            <Carousel.Caption>
              <h3>Meet new people</h3>
              <p></p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Grid>
    )
  }
}

export default Home;
