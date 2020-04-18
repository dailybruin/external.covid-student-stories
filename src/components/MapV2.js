import React, { Component } from "react";
import ReactDOM from "react-dom";
import { randomPoint } from "@turf/random";

import Cluster from "@urbica/react-map-gl-cluster";
import "mapbox-gl/dist/mapbox-gl.css";
import cityPointsUS from "city-points-us";
import states from "us-state-converter";
<<<<<<< HEAD

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
=======
import styled from "styled-components";
import axios from "axios";
const MAPBOX_TOKEN =
  "pk.eyJ1IjoiaHVhbmdrYTk3IiwiYSI6ImNrMmw4c2V2YzA0bWUzZG83M2EzN2NjZ2wifQ.ICymOqR-bnQFjDcFtS3xCA"; // Set your mapbox token here
const style = {
  width: "60px",
  height: "60px",
  color: "#fff",
  background: "#1978c8",
  borderRadius: "60px",
  textAlign: "center",
  alignItems: "center",
  justifyContent: "center",
};

class ClusterMarker extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { onClick, ...cluster } = this.props;
    onClick(cluster);
  }

  render() {
    const { longitude, latitude, pointCount } = this.props;

    return (
      <Marker longitude={longitude} latitude={latitude}>
        <div
          onClick={this.onClick}
          style={{
            ...style,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            background: "#f28a25",
          }}
        >
          <div>{pointCount}</div>
        </div>
      </Marker>
    );
  }
}

class Map extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      viewport: {
        latitude: 37.785164,
        longitude: -100,
        zoom: 2.8,
      },
      data: {},
    };

    this._cluster = React.createRef();

    this.onClick = this.onClick.bind(this);
    this.onViewportChange = this.onViewportChange.bind(this);
  }

  onViewportChange(viewport) {
    this.setState({ viewport });
  }

  onClick(cluster) {
    const { clusterId, longitude, latitude } = cluster;

    const supercluster = this._cluster.current.getCluster();
    const zoom = supercluster.getClusterExpansionZoom(clusterId);

    this.setState((state) => {
      const newVewport = {
        ...state.viewport,
        latitude,
        longitude,
>>>>>>> 38a51eb9e0a60dbcb93aa8a2b8fc6ada7d96d92b
        zoom,
        transitionDuration: 500,
      });
    });
  };
  matchLocation(locations) {
<<<<<<< HEAD
    

    var state = locations[0]
    var city=locations[1]
=======
    var location = locations.split(",");

    var state = states.abbr(location[1].trim());
>>>>>>> 38a51eb9e0a60dbcb93aa8a2b8fc6ada7d96d92b

    return cityPointsUS.features.find(
      (point) =>
        point.properties.state === state &&
        point.properties.city.toLowerCase().trim() ===
          city.toLowerCase().trim()
    );
  }
      
      

<<<<<<< HEAD
  render() {
    const { viewport } = this.state;
    console.log("this is data ", data);


    return (
      <MapGL
=======
  componentWillMount() {
    // Loads some users on initial load
    this.loadStories();
  }

  loadStories() {
    this.setState({ isLoading: true }, () => {
      axios(`https://covidstories.dailybruin.com/stories`)
        .then((results) => {
          console.log("THIS IS RESULTS data ", results.data);
          const newStories = results.data;
          this.setState({
            data: newStories,
          });
          this.setState({
            isLoading: false,
          });
        })
        .catch((err) => {
          this.setState({});
        });
    });
  }

  render() {
    const { viewport, data } = this.state;
    var cities = [];
    for (var i = 0; i < data.length; i++) {
      console.log("TEST CITY ", data[i].fields.city);
      cities.push(data[i].fields.city);
    }
    console.log("THIS IS CITIES ", cities);

    let raw_points = cities.map(this.matchLocation);
    console.log("THIS IS RAW POINTS ", raw_points);
    var points = raw_points.filter(function (x) {
      return x !== undefined;
    });
    console.log("THIS IS POINTS ", points);

    points.map((point, index) => (point.id = index));
    return (
      <MapGL
        style={{
          width: "80%",
          height: "400px",
        }}
        mapStyle="mapbox://styles/mapbox/light-v9"
        accessToken={MAPBOX_TOKEN}
        onViewportChange={this.onViewportChange}
>>>>>>> 38a51eb9e0a60dbcb93aa8a2b8fc6ada7d96d92b
        {...viewport}
        width="80%"
        height="400px"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={this._onViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={[clusterLayer.id]}
        onClick={this._onClick}
      >
<<<<<<< HEAD
        <Source
          type="geojson"
          data="https://huangka97.github.io/test.geojson"
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
          ref={this._sourceRef}
=======
        <Cluster
          ref={this._cluster}
          radius={40}
          extent={512}
          nodeSize={64}
          component={(cluster) => (
            <ClusterMarker onClick={this.onClick} {...cluster} />
          )}
>>>>>>> 38a51eb9e0a60dbcb93aa8a2b8fc6ada7d96d92b
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
