import React, { Component } from "react";
import Select from "react-select";
import { css } from "emotion";

const options = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

export default class SearcahbleDropdown extends React.Component {
  state = {};

  render() {
    return <Select options={options} isSearchable isMulti />;
  }
}
