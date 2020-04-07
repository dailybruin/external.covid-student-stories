import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { css } from "emotion";
import { Link as ScrollLink, scroller } from "react-scroll";

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
  font-size: 20px;
  padding: 50px;
  box-sizing: border-box;
  color: white;
  background-color: #586572;
  width: 100%;
`;

const TitlePage = styled("div")`
  height: 100vh;
  width: 100%;
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
        <ScrollMessage>
          scroll down to see how students have been impacted
        </ScrollMessage>
      </TitlePage>
    );
  }
}
