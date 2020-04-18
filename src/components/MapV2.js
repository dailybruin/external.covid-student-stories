import React, { Component } from "react";
import ReactDOM from "react-dom";

import { css } from "emotion";

import "mapbox-gl/dist/mapbox-gl.css";
import cityPointsUS from "city-points-us";
import states from "us-state-converter";

import data from "./test.geojson";
import MapGL, { Source, Layer } from "react-map-gl";
import {
  clusterLayer,
  clusterCountLayer,
  unclusteredPointLayer,
} from "./layers";
import citystates from "./city_state.json";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiaHVhbmdrYTk3IiwiYSI6ImNrMmw4c2V2YzA0bWUzZG83M2EzN2NjZ2wifQ.ICymOqR-bnQFjDcFtS3xCA"; // Set your mapbox token here

class Map extends React.PureComponent {
  state = {
    viewport: {
      latitude: 40.67,
      longitude: -103.59,
      zoom: 3,
      bearing: 0,
      pitch: 0,
    },
  };

  _sourceRef = React.createRef();

  _onViewportChange = (viewport) => this.setState({ viewport });

  _onClick = (event) => {
    const feature = event.features[0];
    const clusterId = feature.properties.cluster_id;

    const mapboxSource = this._sourceRef.current.getSource();

    mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
      if (err) {
        return;
      }

      this._onViewportChange({
        ...this.state.viewport,
        longitude: feature.geometry.coordinates[0],
        latitude: feature.geometry.coordinates[1],
        zoom,
        transitionDuration: 500,
      });
    });
  };
  matchLocation(locations) {
    var state = locations[0];
    var city = locations[1];

    return cityPointsUS.features.find(
      (point) =>
        point.properties.state === state &&
        point.properties.city.toLowerCase().trim() === city.toLowerCase().trim()
    );
  }

  render() {
    const { viewport } = this.state;
    console.log("this is data ", data);

    return (
      <MapGL
        {...viewport}
        width="100%"
        height="600px"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={this._onViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={[clusterLayer.id]}
        onClick={this._onClick}
      >
        <Source
          type="geojson"
          data="https://huangka97.github.io/test.geojson"
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
          ref={this._sourceRef}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>
      </MapGL>
    );
  }
}

export default Map;
