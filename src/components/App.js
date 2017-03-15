import React, { Component } from 'react';
// import logo from './logo.svg';
import '../App.css';
// import axios from 'axios';
import {  } from 'react-bootstrap';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { browserHistory } from 'react-router';

class App extends Component {

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
							<NavItem eventKey={4} href="#">Profile</NavItem>
							<NavDropdown eventKey={3} title="Leagues" id="basic-nav-dropdown">
								<MenuItem eventKey={3.1}>Spring League 2017</MenuItem>
								<MenuItem eventKey={3.2}>Summer League 2017</MenuItem>
							</NavDropdown>
			        <NavItem eventKey={1} onClick={() => browserHistory.push('/courts')}>Find Courts</NavItem>
			        <NavItem eventKey={2} onClick={() => browserHistory.push('/score')}>Submit Score</NavItem>
							<NavItem eventKey={3} href="#">View Score</NavItem>
			      </Nav>
			      <Nav pullRight>
			        <NavItem eventKey={1} href="#">Link Right</NavItem>
			        <NavItem eventKey={2} href="#">Link Right</NavItem>
			      </Nav>
			    </Navbar.Collapse>
			  </Navbar>

				{React.cloneElement(
					this.props.children
				)}

			</div>
		)
	}
}

export default App;
