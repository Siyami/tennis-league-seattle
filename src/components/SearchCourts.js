import React, { Component } from 'react';
import Map from './Map';
import Courts from './Courts';
import axios from 'axios';
import { Grid } from 'react-bootstrap';

class SearchCourts extends Component {
	constructor(){
		super();
		this.state = {
			courts: []
		};
	}

	componentDidMount(){
		const url = 'https://api.foursquare.com/v2/venues/search?v=20140806&ll=47.6062,-122.24&client_id=XMWHRJ1GC53RBBVTDKPVN0FE4ZFQ5BT2DEF3TQYWPZYFWKBT&client_secret=1JHMHNHRO25DFMFXWAWBAKQQQXK3ARSE4ZWRA5LI1IZ1WLS4&query=tennis+courts';

		axios.get(url)
			.then(({data}) => {
				this.setState({
					courts: data.response.venues
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}

	render(){
		const location = {
			lat: 47.538,
			lng: -122.27
		};

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
				<div style={{ width: "100%", marginLeft: 0 }}>
					<div style={{
							height: 500,
							width: '100%',
							display: 'flex',
							flexFlow: 'row nowrap',
							justifyContent: 'center',
							padding: 0 }}>
						<Map center={location} markers={this.state.courts} />
					</div>
				</div>
			</Grid>
		);
	}
}

export default SearchCourts;
