import React, { Component } from 'react';
// import logo from './logo.svg';
import '../App.css';
// import axios from 'axios';
import {  } from 'react-bootstrap';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import axios from 'axios';

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			isLoggedIn: false

		}

		this.setStateFromLoginComponent = this.setStateFromLoginComponent.bind(this);
		this.logOut = this.logOut.bind(this);

	}

	// Move get request token inside the constructor
	componentWillMount () {
		axios.get('/api/token')
			.then((res) => {
				console.log(res.data);
				 this.setState({ isLoggedIn: res.data })
			 })
			.catch(err => {
				console.log(err)
			});
	}

	setStateFromLoginComponent(loggedInPlayerFirstName, loggedInPlayerLastName) {
		// console.log(loggedInPlayerFirstName + currentPlayerLastName);
		this.setState({
			isLoggedIn: true,
		})
	}

	logOut() {
		axios.delete('api/token')
			.then((res) => {
				this.setState({
					isLoggedIn: false
				})
			})
			.catch((err) => {

			});
	}

	render(){
		return (
			<div>

				<Navbar inverse collapseOnSelect>
			    <Navbar.Header>
			      <Navbar.Brand>
			        <a onClick={() => browserHistory.push('/')}>TennisSeattle</a>
			      </Navbar.Brand>
			      <Navbar.Toggle />
			    </Navbar.Header>
			    <Navbar.Collapse>
			      <Nav>
							<NavItem eventKey={4} onClick={() => browserHistory.push('/profile')}>Profile</NavItem>
							<NavDropdown eventKey={3} title="Leagues" id="basic-nav-dropdown">
								<MenuItem eventKey={3.1} onClick={() => browserHistory.push('/SpringLeague2017')}>Spring League 2017</MenuItem>
								<MenuItem eventKey={3.2}>Summer League 2017</MenuItem>
							</NavDropdown>
			        <NavItem eventKey={1} onClick={() => browserHistory.push('/courts')}>Find Courts</NavItem>
			        <NavItem eventKey={2} onClick={() => browserHistory.push('/submitscore')}>Submit Score</NavItem>
							<NavItem eventKey={3} onClick={() => browserHistory.push('/viewscores')}>View All Scores</NavItem>
			      </Nav>
						{this.state.isLoggedIn ? (
							<Nav pullRight>
								<NavItem eventKey={1} onClick={this.logOut}>Sign Out</NavItem>
							</Nav>

						) : (
							<Nav pullRight>
								<NavItem eventKey={1} onClick={() => {browserHistory.push('/login')}}>Log In</NavItem>
								<NavItem eventKey={2} onClick={() => {browserHistory.push('/signup')}}>Sign Up</NavItem>
							</Nav>
						)
					}
			    </Navbar.Collapse>
			  </Navbar>

				{React.cloneElement(
					this.props.children,
					{
						setStateFromLoginComponent: this.setStateFromLoginComponent
					}
				)}

				{/* <Navbar style={{position: "flex", bottom: "0", height: "40px", marginTop: "40px"}} inverse collapseOnSelect>
			    <Navbar.Header>
			      <Navbar.Brand>
			        <a onClick={() => browserHistory.push('/')}>TennisSeattle</a>
			      </Navbar.Brand>
			      <Navbar.Toggle />
			    </Navbar.Header>
			    <Navbar.Collapse>
			      <Nav>
							<NavItem eventKey={4} onClick={() => browserHistory.push('/profile')}>Profile</NavItem>
							<NavDropdown eventKey={3} title="Leagues" id="basic-nav-dropdown">
								<MenuItem eventKey={3.1} onClick={() => browserHistory.push('/SpringLeague2017')}>Spring League 2017</MenuItem>
								<MenuItem eventKey={3.2}>Summer League 2017</MenuItem>
							</NavDropdown>
			        <NavItem eventKey={1} onClick={() => browserHistory.push('/courts')}>Find Courts</NavItem>
			        <NavItem eventKey={2} onClick={() => browserHistory.push('/submitscore')}>Submit Score</NavItem>
							<NavItem eventKey={3} onClick={() => browserHistory.push('/viewscores')}>View All Scores</NavItem>
			      </Nav>
						{this.state.isLoggedIn ? (
							<Nav pullRight>
								<NavItem eventKey={1} onClick={this.logOut}>Sign Out</NavItem>
							</Nav>

						) : (
							<Nav pullRight>
								<NavItem eventKey={1} onClick={() => {browserHistory.push('/login')}}>Log In</NavItem>
								<NavItem eventKey={2} onClick={() => {browserHistory.push('/signup')}}>Sign Up</NavItem>
							</Nav>
						)
					}
			    </Navbar.Collapse>
			  </Navbar> */}

			</div>
		)
	}
}

export default App;
