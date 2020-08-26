import React, {Component} from 'react';
import ReactMapboxGl, { Layer, Feature, Marker, ZoomControl } from 'react-mapbox-gl';

const zoomDefault = 17;

const Map = ReactMapboxGl({
  accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
  maxZoom: 19,
  minZoom: 15
});

class mapComponent extends Component {

	constructor(props) {
		super(props);
		this.state = {
			lon: props.lon,
			lat: props.lat,
			zoom: zoomDefault,
			lonMarker: props.lon,
			latMarker: props.lat
		};
	}

	componentDidUpdate(prevProps) {
		if(this.props.lat !== prevProps.lat) {
			this.setState({
				lat: this.props.lat,
				lon: this.props.lon,
				zoom: zoomDefault,
				lonMarker: this.props.lon,
				latMarker: this.props.lat
			});
		}
	}

	render() {

		return (
			<Map
				style="mapbox://styles/mapbox/satellite-v9"
				center={[this.state.lon, this.state.lat]}
				zoom={[this.state.zoom]}
				containerStyle={{ width: '100%', height: '100%' }}
				movingMethod='jumpTo'
				onMoveEnd={(map) => this.setState(state => ({
						lon: map.getCenter().lng,
							lat: map.getCenter().lat,
						zoom: map.getZoom()
					})
				)}
			>
				<Marker
					coordinates={[this.state.lonMarker, this.state.latMarker]}
					anchor="bottom">
					<img src='/marker.svg'/>
				</Marker>
				<ZoomControl/>
			</Map>
		);
	}
}

export default mapComponent;
