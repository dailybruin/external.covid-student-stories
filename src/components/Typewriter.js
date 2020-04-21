import React, { Component } from "react";
import Typed from "react-typed";
import styled from "styled-components";

const mediaQueries = {
  mobile: "@media (max-width: 700px)",
  notMobile: "@media (min-width: 701px)",
  tablet: "@media (max-width: 900px)",
};
const { mobile, notMobile, tablet } = mediaQueries;

const BigTitle = styled("div")`
  overflow: hidden;
  font-size: 50px;
  font-weight: 900;
  color: white;
  ${mobile} {
    font-size: 24px;
    padding: 5px;
  }
`;

export default class Typewriter extends React.Component {
  render() {
    return (
      <BigTitle>
        <Typed strings={["Unfinished Stories"]} typeSpeed={130} />
      </BigTitle>
    );
  }
}
