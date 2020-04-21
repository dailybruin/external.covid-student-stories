import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { css } from "emotion";
import { Link as ScrollLink, scroller } from "react-scroll";
import Slideshow from "./Slideshow";
import Button from "../button.svg";
import Typewriter from "./Typewriter";
import Map from "../components/MapV2";
import axios from "axios";

const MapContainer = styled("div")`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const mediaQueries = {
  mobile: "@media (max-width: 700px)",
  notMobile: "@media (min-width: 701px)",
  tablet: "@media (max-width: 900px)",
};
const { mobile, notMobile, tablet } = mediaQueries;

const AddStoryLink = styled(Link)`
  font-size: 24px;
  color: black !important;
  font-weight: 800;
  z-index: 9999;
  background-color: white;
  padding: 10px 20px;
  border-radius: 5px;
  /* box-shadow: 0px 5px 5px gray solid; */
  margin: 15px;
  outline: none;
  text-decoration: none;
  :hover {
    background-color: gray;
    text-decoration: none;
    color: black !important;
  }
  :active {
    /* box-shadow: none; */
    /* top: 5px; */
  }
  :visited {
    color: inherit;
  }
  ${mobile} {
    font-size: 16px;
    padding: 5px;
    margin: 5px;
  }
`;

const ScrollMessage = styled("div")`
  cursor: pointer;
  position: absolute;
  z-index: 11;

  bottom: 30px;
  /* @keyframes shadow-pulse {
    0% {
      box-shadow: 0 0 0 0px rgba(0, 0, 0, 1);
    }
    100% {
      box-shadow: 0 0 0 35px rgba(0, 0, 0, 0);
    }
  } */
  filter: brightness(110%);
  &:hover {
    filter: brightness(130%);
  }

  @keyframes bounce {
    100% {
      transform: translateY(2px);
    }
    50% {
      transform: translateY(-10px);
    }
    0% {
      transform: translateY(2px);
    }
  }
  animation: bounce 1.5s infinite;
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
  ${mobile} {
    font-size: 12px;
    padding: 1px;
  }
`;

const CaptionBottom = styled("div")`
  overflow: hidden;
  position: absolute;
  z-index: 11;
  filter: brightness(80%);
  text-align: center;
  bottom: 80px;
  font-size: 18px;
  color: white;
  ${mobile} {
    font-size: 12px;
    padding: 1px;
    bottom: 60px;
    width: 80%;
  }
`;

const Coloring = styled("div")`
  overflow: hidden;
  background-color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  opacity: 0.75;
  width: 800px;
  padding: 30px;
  top: 0px;
  z-index: 1000000;
  position: absolute;
  text-align: center;
  ${mobile} {
    width: 100%;
    padding: 10px;
  }
`;

export default class Title extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }
  componentDidMount() {
    this.setState({ isLoading: true }, () => {
      axios(`https://covidstudents.dailybruin.com/api/stories/stats`)
        .then((results) => {
          const newStories = results.data;
          this.setState({
            numResponses: newStories.count,
          });
        })
        .catch((err) => {});
    });
  }
  render() {
    return (
      <TitlePage>
        <Coloring>
          <Typewriter />
          <Caption>
            This new normal has not been easy. The COVID-19 pandemic has
            uprooted students’ everyday lives as they once knew them.
          </Caption>
          <AddStoryLink
            to="/form"
            // onClick={() => {
            //   scroller.scrollTo("navbar", {
            //     duration: 500,
            //     delay: 0,
            //     smooth: "easeInOutQuint",
            //   });
            // }}
          >
            SHARE YOUR STORY
          </AddStoryLink>
          <Caption>
            <b>{this.state.numResponses ? this.state.numResponses : "--"}</b>{" "}
            students worldwide have shared.
          </Caption>
        </Coloring>

        <div
          className={css`
            background: linear-gradient(
              180deg,
              rgba(0, 0, 0, 0) 0%,
              rgba(0, 0, 0, 0.3) 80%,
              rgba(0, 0, 0, 0.85) 95%
            );
            height: 100%;
            width: 100%;
            z-index: 10;
            pointer-events: none;
          `}
        ></div>
        <MapContainer>
          <Map component={Map} />
        </MapContainer>

        <CaptionBottom>
          Read how the novel coronavirus pandemic has affected students’ lives.
        </CaptionBottom>
        <ScrollMessage>
          <img
            src={Button}
            onClick={() => {
              scroller.scrollTo("navbar", {
                duration: 500,
                delay: 0,
                smooth: "easeInOutQuint",
              });
            }}
          />
        </ScrollMessage>
      </TitlePage>
    );
  }
}
