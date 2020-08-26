import React from 'react';
import ReactMapboxGl, { Layer, Feature, Marker, ZoomControl } from 'react-mapbox-gl';

function mapComponent(props) {
	const Map = ReactMapboxGl({
	  accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
	  maxZoom: 19,
	  minZoom: 16
	});

	const lonlat = [props.lon, props.lat]

	return (
		<Map
			style="mapbox://styles/mapbox/satellite-v9"
			center={lonlat}
			zoom={[17]}
			containerStyle={{ width: '100%', height: '100%'}}
		>
			<Marker
				coordinates={lonlat}
				anchor="bottom">
				<img src='/marker.svg'/>
			</Marker>
			<ZoomControl/>
		</Map>
	);
}

export default mapComponent;
