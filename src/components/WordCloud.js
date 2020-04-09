import React from "react";
import styled from "styled-components";
import ReactWordcloud from "react-wordcloud";
import words from "./words";

const Wrapper = styled("div")`
  display: flex;
  justify-content: center;
`;

const options = {
  colors: ["#4c5f7a", "#393e6f", "#3d2e4f", "#321d2f", "#9467bd", "#8c564b"],
  enableTooltip: true,
  deterministic: false,
  fontFamily: "impact",
  fontSizes: [5, 60],
  fontStyle: "normal",
  fontWeight: "normal",
  padding: 1,
  rotations: 3,
  rotationAngles: [0, 90],
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
