import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { css } from "emotion";
import { Link as ScrollLink, scroller } from "react-scroll";
import Slideshow from "./Slideshow";
import Button from "../button.svg";
import { ScrollTo } from "react-scroll-to";

const AddStoryLink = styled(Link)`
  font-size: 18px;
  color: white;
  font-weight: 800;
  z-index: 9999;
  font-size: 36px;
  color: #a1afbc;
  font-weight: 800;
`;

const TitleMessage = styled("div")`
  overflow: hidden;
  font-size: 96px;
  padding: 50px;
  font-weight: 900;
  color: #a1afbc;
  margin-bottom: 150px;
`;

const ScrollMessage = styled("div")`
  overflow: hidden;
  position: absolute;
  justify-content: center;
  align-items: center;
  text-align: center;
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

const BigTitle = styled("div")`
  overflow: hidden;
  font-size: 70px;
  font-weight: 900;
  color: white;
  padding-top: 20px;
`;

const Caption = styled("div")`
  overflow: hidden;
  font-size: 18px;
  color: white;
`;

const Coloring = styled("div")`
  overflow: hidden;
  background-color: black;
  opacity: 0.7;
  width: 800px;
  height: 220px;
  z-index: 1000000;
  position: absolute;
  text-align: center;
  bottom: 75%;
`;

export default class Title extends React.Component {
  render() {
    return (
      <TitlePage>
        <Coloring>
          <BigTitle>Unfinished Stories</BigTitle>
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
            <button onClick={() => scroll({ y: 750, smooth: true })}>
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
