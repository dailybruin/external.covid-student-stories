import React, { Component } from "react";
import Select from "react-select";
import { css } from "emotion";

const options = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
];

export default class SearcahbleDropdown extends React.Component {
  state = {};

  render() {
    return (
      <Select
        options={options}
        defaultValue="Select ..."
        isSearchable
        isMulti
      />
    );
  }
}
