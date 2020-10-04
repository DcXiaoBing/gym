import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat: 42.341886, lng: -71.080684 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: 42.341886, lng: -71.080684 }} />}
  </GoogleMap>
))

export default function () {
  return (
    <MyMapComponent
      isMarkerShown
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAi_L3T5IaX27zKZ9SoU3YoWHwb2azKoUY&v=3.exp&libraries=geometry,drawing,places`}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `400px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  );
}
