import React, { Component } from 'react'
// import logo from './logo.svg';
import Map from './Map'
import Courts from './Courts'
import axios from 'axios'
import { Grid } from 'react-bootstrap'

class SearchCourts extends Component {
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
				// console.log(data);
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
			lat: 47.548,
			lng: -122.2
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

				{/* {React.cloneElement(
					this.props.children
				)} */}

				<div>
					<div style={{width:345, height:500}}>
						<Map center={location} markers={this.state.courts} />
					</div>

					<Courts courts={this.state.courts} />
				</div>

			</Grid>
		)
	}
}

export default SearchCourts;
