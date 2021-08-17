import React, {useState, useEffect} from "react";
import ReactMapboxGl, {Feature, Layer, ZoomControl} from "react-mapbox-gl";

const zoomDefault = 17;

const Map = ReactMapboxGl({
  accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
  maxZoom: 19,
  minZoom: 15,
});

export default function mapComponent(props) {
  const [zoom, setZoom] = useState(zoomDefault);
  const [lonLat, setLonLat] = useState(props.centerCoordinate);
  const [featurePolygon, setFeaturePolygon] = useState(props.featurePolygon);
  const [metaData, setMetadata] = useState(props.metaData);

  useEffect(() => {
    setZoom(zoomDefault);
    setLonLat(props.centerCoordinate);
  }, [props.centerCoordinate]);

  useEffect(() => {
    setFeaturePolygon(props.featurePolygon);
  }, [props.featurePolygon]);

  useEffect(() => {
    setMetadata(props.metaData);
  }, [props.metaData]);

  return (
    <Map
      style="mapbox://styles/mapbox/satellite-v9"
      center={lonLat.coordinates}
      zoom={[zoom]}
      containerStyle={{width: "100%", height: "100%"}}
      movingMethod="jumpTo"
      onMoveEnd={(map) => {
        setZoom(map.getZoom());
        setLonLat({coordinates: [map.getCenter().lng, map.getCenter().lat]});
      }}
    >
      <Layer
        type="fill"
        id="polygon"
        paint={{
          "fill-color": metaData.fill
            ? metaData.fill
            : metaData.title === "Schools"
            ? "#f3ff33"
            : "#ff33f3",
          "fill-opacity": 0.3,
          "fill-outline-color": metaData.stroke,
        }}
      >
        <Feature coordinates={featurePolygon.coordinates} />
      </Layer>
      <ZoomControl />
    </Map>
  );
}
