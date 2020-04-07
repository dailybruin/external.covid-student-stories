import React from "react";
import styled from "styled-components";
import ReactWordcloud from "react-wordcloud";
import words from "./words";

const Wrapper = styled("div")`
  justify-content: center;
  margin: auto;
`;

function WordCloud() {
  return (
    <Wrapper>
      <div style={{ height: 400, width: 600 }}>
        <ReactWordcloud words={words} />
      </div>
    </Wrapper>
  );
}

export default WordCloud;
