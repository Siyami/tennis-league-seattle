import React, { Component } from 'react'
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps'

class Map extends Component {
	render(){
		const mapContainer = <div style={{height: '100%', width:'100%'}}></div>

		const markers = this.props.markers.map((court, i) => {

			const marker = {
				position: {
					lat: court.location.lat,
					lng: court.location.lng
				},
				title: court.location.address
			}

			return <Marker key={i} {...marker} />
		})

		return (
		    <GoogleMapLoader
		        containerElement={mapContainer}
		        googleMapElement={
			        <GoogleMap
			            defaultZoom={10}
			            defaultCenter={this.props.center}
			            options={{streetViewControl: false, mapTypeControl: false}}>
			            { markers }
			        </GoogleMap>
		    	} />
		)
	}
}

export default Map
