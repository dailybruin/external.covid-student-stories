import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { css } from "emotion";
import { Link as ScrollLink, scroller } from "react-scroll";
import Slideshow from "./Slideshow";
import Button from "../button.svg";
import { ScrollTo } from "react-scroll-to";

const AddStoryLink = styled(Link)`
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
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: Avenir;
`;

const Background = styled("div")`
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  position: absolute;
  padding-bottom: 500px;
  padding-right: 50px;
  font-size: 96px;
  font-weight: 900;
  color: #ecedee;
  white-space: nowrap;
`;

const Wrapping = styled("div")`
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  position: absolute;
  padding-bottom: 800px;
  padding-right: 50px;
  font-size: 96px;
  font-weight: 900;
  color: #ecedee;
  white-space: nowrap;
  padding-right: 30px;
`;

const SameLine = styled("div")`
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  position: absolute;
  padding-bottom: 200px;
  padding-right: 50px;
  font-size: 96px;
  font-weight: 900;
  color: #ecedee;
  white-space: nowrap;
  padding-right: 30px;
`;

const Hidden = styled("a")`
  color: rgba(0, 0, 0, 0);
`;

export default class Title extends React.Component {
  render() {
    return (
      <TitlePage>
        <div
          className={css`
            overflow: auto;
          `}
        >
          <Slideshow />
        </div>
        <Wrapping>
          Unfinished Stories Unfinished Stories Unfinished Stories Unfinished
          Stories Unfinished Stories
        </Wrapping>
        <Background>
          Unfinished Stories Unfinished Stories Unfinished Stories Unfinished
          Stories Unfinished Stories Unfinished Stories
        </Background>
        <SameLine>
          Unfinished Stories <Hidden> Unfinished Stories </Hidden> Unfinished
          Stories
        </SameLine>
        <TitleMessage>COVID STORIES</TitleMessage>
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
