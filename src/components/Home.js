import React, { Component } from 'react';
import { Grid, Carousel } from 'react-bootstrap';

class Home extends Component {
  render() {
    return (
      <Grid>
        {/* <h5>Welcome to TennisSeattle where you can join tennis leagues, play matches and meet new people</h5> */}
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
              {/* <h3></h3>
              <p></p> */}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img width={900} height={500} alt="900x500" src="tennis3.jpg"/>
            <Carousel.Caption>
              {/* <h3></h3>
              <p></p> */}
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Grid>
    )
  }
}

export default Home;
