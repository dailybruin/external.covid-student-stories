import React from "react";
import styled from "styled-components";
import ReactWordcloud from "react-wordcloud";
import { css } from "emotion";
import words from "./words";

const Wrapper = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  font-size: 20px;
`;

const options = {
  colors: ["#B5CACA", "#96B6D5", "#8084AE", "#5B7995", "#6D6B67", "#BE9188"],
  enableTooltip: true,
  deterministic: false,
  fontFamily: "Avenir",
  fontSizes: [18, 60],
  fontStyle: "normal",
  fontWeight: "normal",
  padding: 0,
  rotations: 3,
  rotationAngles: [0],
  scale: "sqrt",
  spiral: "archimedean",
  transitionDuration: 1000,
};

function WordCloud(props) {
  return (
    <Wrapper>
      <div
        className={css`
          text-align: center;
        `}
      >
        These are the words most often used in your stories.
      </div>
      <ReactWordcloud options={options} words={props.words} />
    </Wrapper>
  );
}

export default WordCloud;
