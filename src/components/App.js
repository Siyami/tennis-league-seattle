import React, { Component } from 'react';
import '../App.css';
import {  } from 'react-bootstrap';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import axios from 'axios';
import cookie from 'react-cookie';

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			playerFirstName: cookie.load('playerFirstName'),
			isLoggedIn: false
		}
		this.setStateFromLoginComponent = this.setStateFromLoginComponent.bind(this);
		this.logOut = this.logOut.bind(this);
	}

	componentWillMount () {
		axios.get('/api/token')
			.then((res) => {
				 this.setState({ isLoggedIn: res.data })
			 })
			.catch(err => {
				console.log(err)
			});
	}

	setStateFromLoginComponent(loggedInPlayerFirstName, loggedInPlayerLastName) {
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
				browserHistory.push('/')
			})
			.catch((err) => {
				console.log(err);
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
							{this.state.isLoggedIn ? (
								<NavItem eventKey={4} onClick={() => browserHistory.push('/profile')}>Profile</NavItem>
								) : (null)}
							<NavDropdown eventKey={3} title="Leagues" id="basic-nav-dropdown">
								<MenuItem eventKey={3.1} onClick={() => browserHistory.push('/SpringLeague2017')}>Spring League 2017</MenuItem>
								<MenuItem eventKey={3.2} onClick={() => browserHistory.push('/SummerLeague2017')}>Summer League 2017</MenuItem>
								<MenuItem eventKey={3.3} onClick={() => browserHistory.push('/FallLeague2017')}>Fall League 2017</MenuItem>
							</NavDropdown>
			        <NavItem eventKey={1} onClick={() => browserHistory.push('/courts')}>Find Courts</NavItem>
							{this.state.isLoggedIn ? (
								<NavItem eventKey={2} onClick={() => browserHistory.push('/submitscore')}>Submit Score</NavItem>
								) : (null)}
							<NavItem eventKey={3} onClick={() => browserHistory.push('/viewscores')}>View All Scores</NavItem>
			      </Nav>
						{this.state.isLoggedIn ? (
							<Nav pullRight>
								<NavItem eventKey={2} onClick={this.logOut}>Sign Out</NavItem>
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
			</div>
		)
	}
}

export default App;
