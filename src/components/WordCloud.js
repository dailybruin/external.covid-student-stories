import React from "react";
import styled from "styled-components";
import ReactWordcloud from "react-wordcloud";
import words from "./words";

const Wrapper = styled("div")`
  display: flex;
  justify-content: center;
`;

const options = {
  colors: ["#B5CACA", "#96B6D5", "#8084AE", "#5B7995", "#6D6B67", "#BE9188"],
  enableTooltip: true,
  deterministic: false,
  fontFamily: "impact",
  fontSizes: [5, 60],
  fontStyle: "normal",
  fontWeight: "normal",
  padding: 1,
  rotations: 3,
  rotationAngles: [0],
  scale: "sqrt",
  spiral: "archimedean",
  transitionDuration: 1000,
};

function WordCloud() {
  return (
    <Wrapper>
      <ReactWordcloud options={options} words={words} />
    </Wrapper>
  );
}

export default WordCloud;
