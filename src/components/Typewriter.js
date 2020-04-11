import React, { Component } from "react";
import Typed from "react-typed";
import styled from "styled-components";

const BigTitle = styled("div")`
  overflow: hidden;
  font-size: 65px;
  font-weight: 900;
  color: white;
  padding-top: 20px;
`;

export default class Typewriter extends React.Component {
  render() {
    return (
      <BigTitle>
        <Typed strings={["Unfinished Stories"]} typeSpeed={50} />
      </BigTitle>
    );
  }
}
