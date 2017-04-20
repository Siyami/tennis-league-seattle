import React, { Component } from 'react';

class Courts extends Component {
	render(){
		const list = this.props.courts.map((court, i) => {
			return (
				<li key={i}>{court.name}</li>
			);
		});

		return (
			<div>
				Tennis Courts
				<ol>
					{list}
				</ol>
			</div>
		);
	}
}

export default Courts;
