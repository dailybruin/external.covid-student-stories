import React from "react";
import styled from "styled-components";
import ReactWordcloud from "react-wordcloud";
import words from "./words";
import { Resizable } from "re-resizable";

const resizeStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "#f0f0f0",
};

const Wrapper = styled("div")`
  display: flex;
  justify-content: center;
  margin: auto;
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
      <Resizable
        defaultSize={{
          width: 600,
          height: 300,
        }}
        style={resizeStyle}
      >
        <div style={{ height: 400, width: 600 }}>
          <ReactWordcloud options={options} words={words} />
        </div>
      </Resizable>
    </Wrapper>
  );
}

export default WordCloud;
