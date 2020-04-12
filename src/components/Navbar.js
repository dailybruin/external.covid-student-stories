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
  padding: 0 2em;
  align-items: center;
  overflow-x: scroll;
  ${mobile} {
    padding: 0 1em;
  }
`;

const StyledLink = styled(Link)`
  font-size: 18px;
  margin: 30px;
  box-sizing: border-box;
  color: white;
  &:hover {
    color: white !important;
    text-decoration: underline !important;
  }
  ${mobile} {
    font-size: 14px;
    margin: 5px;
  }
`;

const Header = styled(Link)`
  font-size: 24px;
  text-decoration: none;
  color: white;
  &:hover {
    color: white !important;
    text-decoration: underline !important;
  }
  font-weight: 400;
  ${mobile} {
    font-size: 16px;
  }
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
          <Header to="/">Unfinished Stories</Header>
          <div>
            <StyledLink
              to="/stories"
              className={css`
                text-decoration: ${this.props.highlighted == "stories"
                  ? "underline !important"
                  : "none !important"};
              `}
            >
              stories
            </StyledLink>
            <StyledLink
              to="/data"
              className={css`
                text-decoration: ${this.props.highlighted == "data"
                  ? "underline !important"
                  : "none !important"};
              `}
            >
              data
            </StyledLink>
            <StyledLink
              to="/form"
              className={css`
                text-decoration: ${this.props.highlighted == "form"
                  ? "underline !important"
                  : "none !important"};
              `}
            >
              form
            </StyledLink>
          </div>
        </NavbarStyled>
      </Element>
    );
  }
}
