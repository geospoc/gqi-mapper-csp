import React from 'react';
import {Map, TileLayer, Marker, Popup } from 'react-leaflet';


function mapComponent(props) {
	const url = 'https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.jpg90?access_token=' + process.env.NEXT_PUBLIC_ACCESS_TOKEN

	const latlon = [props.lat, props.lon]
	const attribution ="<a href=\"https://www.mapbox.com/about/maps/\" target=\"_blank\">&copy; Mapbox</a> <a href=\"http://www.openstreetmap.org/about/\" target=\"_blank\">&copy; OpenStreetMap</a> <a class=\"mapbox-improve-map\" href=\"https://www.mapbox.com/map-feedback/\" target=\"_blank\">Improve this map</a> <a href=\"https://www.maxar.com/\" target=\"_blank\">&copy; Maxar</a>";

	return (
		<Map center={latlon} zoom={17} style={{ width: '100%', height: '100%'}}>
			<TileLayer
				url={url}
				attribution={attribution}
				maxZoom={19}
				minZoom={16}
			/>
			<Marker position={latlon}></Marker>
		</Map>
	);
}

export default mapComponent;

