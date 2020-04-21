import React, { Component } from "react";
import ReactDOM from "react-dom";

import { css } from "emotion";

import "mapbox-gl/dist/mapbox-gl.css";
import cityPointsUS from "city-points-us";

import data from "./test.geojson";
import MapGL, { Source, Layer } from "react-map-gl";
import {
  clusterLayer,
  clusterCountLayer,
  unclusteredPointLayer,
} from "./layers";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiaHVhbmdrYTk3IiwiYSI6ImNrMmw4c2V2YzA0bWUzZG83M2EzN2NjZ2wifQ.ICymOqR-bnQFjDcFtS3xCA"; // Set your mapbox token here

class Map extends React.PureComponent {
  state = {
    viewport: {
      latitude: 40.67,
      longitude: -98.59,
      zoom: 2,
      bearing: 0,
      pitch: 0,
    },
  };

  _sourceRef = React.createRef();

  _onViewportChange = (viewport) => this.setState({ viewport });

  _onClick = (event) => {
    const feature = event.features[0];
    if (!feature) return;
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
        height="100%"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={this._onViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={[clusterLayer.id]}
        onClick={this._onClick}
      >
        <Source
          type="geojson"
          data="https://covidstudents.dailybruin.com/api/stories/features/"
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={30}
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
