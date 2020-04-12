import React, { useState, useEffect } from "react";
import { useTransition, animated, config } from "react-spring";
import { css } from "emotion";

import cover1 from "../images/covidstories_cover1.jpg";
import cover2 from "../images/covidstories_cover2.jpg";
import cover3 from "../images/covidstories_cover3.jpg";
import cover4 from "../images/covidstories_cover4.jpg";
import cover5 from "../images/covidstories_cover5.jpg";

const mediaQueries = {
  mobile: "@media (max-width: 700px)",
  notMobile: "@media (min-width: 701px)",
  tablet: "@media (max-width: 900px)",
};
const { mobile, notMobile, tablet } = mediaQueries;

const slides = [
  {
    id: 0,
    img: cover1,
    text: "ONE",
  },
  {
    id: 1,
    img: cover2,
    text: "TWO",
  },
  {
    id: 2,
    img: cover3,
    text: "THREE",
  },
  {
    id: 3,
    img: cover4,
    text: "FOUR",
  },
  {
    id: 4,
    img: cover5,
    text: "FIVE",
  },
];

const Slideshow = () => {
  const [index, set] = useState(0);
  const transitions = useTransition(slides[index], (item) => item.id, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.molasses,
  });
  useEffect(
    () => void setInterval(() => set((state) => (state + 1) % 5), 6000),
    []
  );
  return transitions.map(({ item, props, key }) => (
    <div>
      <animated.div
        key={key}
        className={css`
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background-size: cover;
          background-position: center;
          will-change: opacity;
        `}
        style={{
          ...props,
          backgroundImage: `url(${item.img})`,
        }}
      >
        <h1> {item.text}</h1>
      </animated.div>
    </div>
  ));
};

export default Slideshow;

// image links
// https://images.hdqwalls.com/download/super-cute-animals-1366x768.jpg
// https://cdn.pixabay.com/photo/2016/02/22/10/06/hedgehog-1215140__340.jpg
// https://www.pixelstalk.net/wp-content/uploads/2016/03/Cute-animal-wallpapers-hd-desktop.jpg
// https://images.unsplash.com/photo-1580637094569-03ebe1594969?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80
