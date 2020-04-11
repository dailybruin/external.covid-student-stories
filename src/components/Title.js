import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { css } from "emotion";
import { Link as ScrollLink, scroller } from "react-scroll";
import Slideshow from "./Slideshow";
import Button from "../button.svg";
import { ScrollTo } from "react-scroll-to";
import Typewriter from "./Typewriter";

const mediaQueries = {
  mobile: "@media (max-width: 700px)",
  notMobile: "@media (min-width: 701px)",
  tablet: "@media (max-width: 900px)",
};
const { mobile, notMobile, tablet } = mediaQueries;

const AddStoryLink = styled(Link)`
  font-size: 24px;
  color: black;
  font-weight: 800;
  z-index: 9999;
  background-color: white;
  padding: 10px;
  position: relative;
  border-radius: 5px;
  box-shadow: 0px 5px 5px gray;
  outline: none;
  text-decoration: none;
  :hover {
    background-color: gray;
    text-decoration: none;
  }
  :active {
    box-shadow: none;
    top: 5px;
    text-decoration: none;
  }
  :visited {
    color: inherit;
  }
  ${mobile} {
    font-size: 16px;
    padding: 5px;
  }
`;

const ScrollMessage = styled("div")`
  overflow: hidden;
  position: absolute;
  justify-content: center;
  text-align: center;
  align-items: center;
  bottom: 0;
  margin: 20px;
  color: white;
  border-radius: 50%;
  @keyframes shadow-pulse {
    0% {
      box-shadow: 0 0 0 0px rgba(0, 0, 0, 1);
    }
    100% {
      box-shadow: 0 0 0 35px rgba(0, 0, 0, 0);
    }
  }
  animation: shadow-pulse 1s infinite;
`;

const TitlePage = styled("div")`
  height: 100vh;
  overflow: hidden !important;
  text-overflow: clip;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: Avenir;
`;

const Caption = styled("div")`
  overflow: hidden;
  font-size: 18px;
  color: white;
  padding-bottom: 15px;
  ${mobile} {
    font-size: 16px;
    padding: 5px;
  }
`;

const Coloring = styled("div")`
  overflow: hidden;
  background-color: black;
  opacity: 0.7;
  width: 800px;
  height: 225px;
  z-index: 1000000;
  position: absolute;
  text-align: center;
  bottom: 75%;
  ${mobile} {
    width: 75%;
    height: 160px;
    padding: 0;
  }
`;

export default class Title extends React.Component {
  render() {
    return (
      <TitlePage>
        <Coloring>
          <Typewriter />
          <Caption>
            students' experiences about how Covid-19 has affected their lives
          </Caption>
          <AddStoryLink
            to="/form"
            onClick={() => {
              scroller.scrollTo("navbar", {
                duration: 500,
                delay: 0,
                smooth: "easeInOutQuint",
              });
            }}
          >
            SHARE YOUR STORY
          </AddStoryLink>
        </Coloring>
        <div
          className={css`
            overflow: auto;
          `}
        >
          <Slideshow />
        </div>
        <ScrollTo>
          {({ scroll }) => (
            <button
              onClick={() => {
                scroller.scrollTo("navbar", {
                  duration: 500,
                  delay: 0,
                  smooth: "easeInOutQuint",
                });
              }}
            >
              <ScrollMessage>
                <img src={Button} />
              </ScrollMessage>
            </button>
          )}
        </ScrollTo>
      </TitlePage>
    );
  }
}
