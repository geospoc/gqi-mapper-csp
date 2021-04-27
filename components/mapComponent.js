import React, {useState, useEffect} from "react";
import ReactMapboxGl, {Marker, ZoomControl} from "react-mapbox-gl";

const zoomDefault = 17;

const Map = ReactMapboxGl({
  accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
  maxZoom: 19,
  minZoom: 15,
});

export default function mapComponent(props) {
  const [zoom, setZoom] = useState(zoomDefault);
  const [lonLat, setLonLat] = useState([props.lon, props.lat]);
  const [lonLatMarker, setLonLatMarker] = useState([props.lon, props.lat]);

  useEffect(() => {
    setZoom(zoomDefault);
    setLonLat([props.lon, props.lat]);
    setLonLatMarker([props.lon, props.lat]);
  }, [props.lon, props.lat]);

  return (
    <Map
      style="mapbox://styles/mapbox/satellite-v9"
      center={lonLat}
      zoom={[zoom]}
      containerStyle={{width: "100%", height: "100%"}}
      movingMethod="jumpTo"
      onMoveEnd={(map) => {
        setZoom(map.getZoom());
        setLonLat([map.getCenter().lng, map.getCenter().lat]);
      }}
    >
      <Marker coordinates={lonLatMarker} anchor="bottom">
        <img src="/marker.svg" />
      </Marker>
      <ZoomControl />
    </Map>
  );
}
