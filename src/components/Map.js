import React, { Component } from "react";
import ReactMapGL from "react-map-gl";
import styled from "styled-components";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiaHVhbmdrYTk3IiwiYSI6ImNrMmw4c2V2YzA0bWUzZG83M2EzN2NjZ2wifQ.ICymOqR-bnQFjDcFtS3xCA"; // Set your mapbox token here
const MapboxStyled = styled("div")`
  height: 10vh;
  position: absolute;
  display: flex;
`;

class Map extends Component {
  state = {
    viewport: {
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 8
    }
  };

  render() {
    const { viewport } = this.state;

    return (
      <MapboxStyled>
        <ReactMapGL
          width="100%"
          height="100%"
          latitude={viewport.latitude}
          longitude={viewport.longitude}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          zoom={viewport.zoom}
          onViewportChange={viewport => this.setState({ viewport })}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        />
      </MapboxStyled>
    );
  }
}

export default Map;
