import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Element } from "react-scroll";

const NavbarStyled = styled("div")`
  position: sticky;
  top: 0;

  height: 7.5vh;
  display: flex;
  justify-content: space-between;
  background-color: #586572;
  box-sizing: border-box;
  padding: 0 3em;
  align-items: center;
`;

const StyledLink = styled(Link)`
  font-size: 18px;
  margin: 30px;
  box-sizing: border-box;
  text-decoration: none;
  color: white;

  &:hover {
  }
`;

const Header = styled("div")`
  font-size: 24px;
  color: white;
  font-weight: 400;
`;

export default class Navbar extends React.Component {
  render() {
    return (
      <Element name="navbar">
        <NavbarStyled>
          <Header>Unfinished Stories</Header>
          <div>
            <StyledLink to="/">stories</StyledLink>
            <StyledLink to="/data">data</StyledLink>
            <StyledLink to="/form">form</StyledLink>
          </div>
        </NavbarStyled>
      </Element>
    );
  }
}
