import React, { useState, useEffect } from "react";
import { useTransition, animated, config } from "react-spring";
import { css } from "emotion";

const slides = [
  {
    id: 0,
    url: "https://images.hdqwalls.com/download/super-cute-animals-1366x768.jpg",
    text: "ONE",
  },
  {
    id: 1,
    url:
      "https://cdn.pixabay.com/photo/2016/02/22/10/06/hedgehog-1215140__340.jpg",
    text: "TWO",
  },
  {
    id: 2,
    url:
      "https://www.pixelstalk.net/wp-content/uploads/2016/03/Cute-animal-wallpapers-hd-desktop.jpg",
    text: "THREE",
  },
  {
    id: 3,
    url:
      "https://images.unsplash.com/photo-1580637094569-03ebe1594969?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
    text: "FOUR",
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
    () => void setInterval(() => set((state) => (state + 1) % 4), 4000),
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
          width: 100vw;
          height: 100vh;
          background-size: cover;
          background-position: center;
          will-change: opacity;
        `}
        style={{
          ...props,
          backgroundImage: `url(${item.url})`,
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
