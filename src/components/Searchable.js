import React, { Component } from "react";
import Select from "react-select";
import { css } from "emotion";

const options = [
  { value: "recent", label: "most recent" },
  { value: "reacted", label: "most reacted" },
  { value: "random", label: "random" },
];

export default class SearcahbleDropdown extends React.Component {
  state = {};

  render() {
    return (
      <div>
        Sort by:
        <Select options={options} />
      </div>
    );
  }
}
