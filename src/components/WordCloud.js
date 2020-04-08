import React from "react";
import styled from "styled-components";
import ReactWordcloud from "react-wordcloud";
import words from "./words";

const Wrapper = styled("div")`
  display: flex;
  justify-content: center;
`;

const options = {
  colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
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
