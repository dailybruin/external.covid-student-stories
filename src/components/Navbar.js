import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Element } from "react-scroll";

const NavbarStyled = styled("div")`
  height: 10vh;
  position: sticky;
  display: flex;
  align-items: center;
  top: 0;
  background-color: lightyellow;
`;

const StyledLink = styled(Link)`
  font-size: 16px;
  margin: 30px;
  box-sizing: border-box;
`;

export default class Navbar extends React.Component {
  render() {
    return (
      <Element name="navbar">
        <NavbarStyled>
          <StyledLink to="/">Stories</StyledLink>
          <StyledLink to="/data">Data</StyledLink>
          <StyledLink to="/form">Form</StyledLink>
        </NavbarStyled>
      </Element>
    );
  }
}
