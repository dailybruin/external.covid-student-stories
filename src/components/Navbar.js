import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Element } from "react-scroll";
import { css } from "emotion";

const mediaQueries = {
  mobile: "@media (max-width: 700px)",
  notMobile: "@media (min-width: 701px)",
  tablet: "@media (max-width: 900px)",
};
const { mobile } = mediaQueries;

const NavbarStyled = styled("div")`
  height: 5.5vh;
  display: flex;
  justify-content: space-between;
  background-color: #6d6b67;
  box-sizing: border-box;
  padding: 0 3em;
  align-items: center;
  overflow-x: scroll;
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
      <Element
        name="navbar"
        className={css`
          position: sticky;
          top: 0;
          z-index: 100000;
          ${mobile} {
            font-size: 12px;
          }
        `}
      >
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
