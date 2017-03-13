import React, { Component } from 'react';
// import logo from './logo.svg';
import '../App.css';
import Map from './Map'
import Courts from './Courts'
import superagent from 'superagent'

class App extends Component {
	constructor(){
		super()
		this.state = {
			courts: []
		}
	}

	componentDidMount(){
		const url = 'https://api.foursquare.com/v2/venues/search?v=20140806&ll=47.6062,-122.24&client_id=XMWHRJ1GC53RBBVTDKPVN0FE4ZFQ5BT2DEF3TQYWPZYFWKBT&client_secret=1JHMHNHRO25DFMFXWAWBAKQQQXK3ARSE4ZWRA5LI1IZ1WLS4&query=tennis+courts'

		superagent
		.get(url)
		.query(null)
		.set('Accept', 'text/json')
		.end((error, response) => {

			const courts = response.body.response.venues

			this.setState({
				courts: courts
			})
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
			<div>
				<div style={{width:600, height:600}}>
					<Map center={location} markers={this.state.courts} />
				</div>

				<Courts courts={this.state.courts} />
			</div>
		)
	}
}

export default App;
