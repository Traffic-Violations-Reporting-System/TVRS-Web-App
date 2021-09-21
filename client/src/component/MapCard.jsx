import * as React from "react";
import { useGoogleMaps } from "react-hook-google-maps";

const config = require("../config.json");
const MapApp = ({lat,lng}) => {
  const { ref, map, google } = useGoogleMaps(
    `${config["GoogleAPIKey"]}`,
    // NOTE: even if you change options later
    {
      center: { lat: lat, lng: lng },
      zoom: 8,
    },
  );
  return <div ref={ref} style={{ width: 400, height: 300 }} />;
};

export default MapApp;
