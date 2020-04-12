import React from "react";
import ReactDOM from "react-dom";
import { randomPoint } from "@turf/random";
import MapGL, { Marker } from "@urbica/react-map-gl";
import Cluster from "@urbica/react-map-gl-cluster";
import "mapbox-gl/dist/mapbox-gl.css";
import cityPointsUS from "city-points-us";
import states from "us-state-converter";
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
        zoom,
      };

      return { ...state, viewport: newVewport };
    });
  }

  getStateTwoDigitCode(stateFullName) {
    return states.fullName(stateFullName);
  }

  matchLocation(locations) {
    var location = locations.split(",");

    var state = states.abbr(location[1].trim());

    return cityPointsUS.features.find(
      (point) =>
        point.properties.state === state &&
        point.properties.city.toLowerCase().trim() ===
          location[0].toLowerCase().trim()
    );
  }

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
        {...viewport}
      >
        <Cluster
          ref={this._cluster}
          radius={40}
          extent={512}
          nodeSize={64}
          component={(cluster) => (
            <ClusterMarker onClick={this.onClick} {...cluster} />
          )}
        >
          {points.map((point) => (
            <Marker
              key={point.id}
              longitude={point.geometry.coordinates[0]}
              latitude={point.geometry.coordinates[1]}
            >
              <div style={style} />
            </Marker>
          ))}
        </Cluster>
      </MapGL>
    );
  }
}

export default Map;
