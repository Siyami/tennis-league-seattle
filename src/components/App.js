import React, { Component } from 'react'
// import logo from './logo.svg';
import '../App.css'
import Map from './Map'
import Courts from './Courts'
import axios from 'axios'
import { Grid } from 'react-bootstrap'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'

class App extends Component {
	constructor(){
		super()
		this.state = {
			courts: []
		}
	}

	componentDidMount(){
		const url = 'https://api.foursquare.com/v2/venues/search?v=20140806&ll=47.6062,-122.24&client_id=XMWHRJ1GC53RBBVTDKPVN0FE4ZFQ5BT2DEF3TQYWPZYFWKBT&client_secret=1JHMHNHRO25DFMFXWAWBAKQQQXK3ARSE4ZWRA5LI1IZ1WLS4&query=tennis+courts'

		axios.get(url)
			.then(({data}) => {
				// console.log(data.response.venues);
				this.setState({
					courts: data.response.venues
				})
			})
			.catch((err) => {
				console.log(err);
			})

	}

	render(){
		const location = {
			lat: 47.6062,
			lng: -122.24
		}

		// you can manually include markers
    // const markers = [
    //   {
    //     location: {
    //       lat: 47.6062,
    // 			lng: -122.24
    //     }
    //   },
    //   {
    //     location: {
    //       lat: 47.6562,
    // 			lng: -122.34
    //     }
    //   }
    // ]

		return (
			<Grid>

				<Navbar inverse collapseOnSelect>
			    <Navbar.Header>
			      <Navbar.Brand>
			        <a href="#">TennisSeattle</a>
			      </Navbar.Brand>
			      <Navbar.Toggle />
			    </Navbar.Header>
			    <Navbar.Collapse>
			      <Nav>
							<NavItem eventKey={4} href="#">Profile</NavItem>
							<NavDropdown eventKey={3} title="Leagues" id="basic-nav-dropdown">
								<MenuItem eventKey={3.1}>Spring League 2017</MenuItem>
								<MenuItem eventKey={3.2}>Summer League 2017</MenuItem>
							</NavDropdown>
			        <NavItem eventKey={1} href="#">Find Courts</NavItem>
			        <NavItem eventKey={2} href="#">Submit Score</NavItem>
							<NavItem eventKey={3} href="#">View Score</NavItem>
			      </Nav>
			      <Nav pullRight>
			        <NavItem eventKey={1} href="#">Link Right</NavItem>
			        <NavItem eventKey={2} href="#">Link Right</NavItem>
			      </Nav>
			    </Navbar.Collapse>
			  </Navbar>

				{/* {React.cloneElement(
					this.props.children
				)} */}

				<div>
					<div style={{width:1140, height:600}}>
						<Map center={location} markers={this.state.courts} />
					</div>

					<Courts courts={this.state.courts} />
				</div>

			</Grid>
		)
	}
}

export default App;
