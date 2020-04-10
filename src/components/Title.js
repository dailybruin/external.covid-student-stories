import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { css } from "emotion";
import { Link as ScrollLink, scroller } from "react-scroll";

const AddStoryLink = styled(Link)`
  font-size: 18px;
  color: white;
  font-weight: 800;
  z-index: 9999;
`;

const TitlePage = styled("div")`
  height: 100vh;
  width: 100%;
  overflow: hidden !important;
  text-overflow: clip;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: Avenir;
`;

const TitleMessage = styled("div")`
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
  opacity: 0.5;
  width: 800px;
  height: 220px;
  position: absolute;
  text-align: center;
  bottom: 75%;
`;

const ScrollMessage = styled("div")`
  overflow: hidden;
  position: absolute;
  justify-content: center;
  align-items: center;
  text-align: center;
  bottom: 0;
  font-size: 20px;
  padding: 50px;
  box-sizing: border-box;
  color: black;
`;

export default class Title extends React.Component {
  render() {
    return (
      <TitlePage>
        <Coloring>
          <TitleMessage>Unfinished Stories</TitleMessage>
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
      </TitlePage>
    );
  }
}
