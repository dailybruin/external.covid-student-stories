import React from "react";
import { css } from "emotion";
import styled from "styled-components";
import Cookies from "universal-cookie";
import like from "../images/thumbs-up.png";
import love from "../images/love.png";
import haha from "../images/haha.png";
import wow from "../images/waow.png";
import sad from "../images/big-simp.png";
import angry from "../images/amgery.png";
import axios from "axios";
import Tooltip from "react-simple-tooltip";

const cookies = new Cookies();
var images = [
  { key: "like", img: like },
  { key: "love", img: love },
  // { key: "haha", img: haha },
  // { key: "wow", img: wow },
  { key: "sad", img: sad },
  { key: "angry", img: angry },
];

var IMAGES_MAP = {
  like: like,
  love: love,
  sad: sad,
  angry: angry,
};

const ImageContainer = styled.div`
  width: 280px;
  width: 200px;
  position: absolute;
  left: 0px;
  top: 25px;
  padding: 3px;
  background: white;
  border-radius: 25px;
  box-shadow: 0 7px 10px rgba(0, 0, 0, 0.4);
  text-align: center;
  transition: opacity 0.6s;
  height: auto;
  opacity: ${(props) => (props.open ? 1 : 0)};
  transform: ${(props) => (props.open ? "'scaleY(1)'," : "scaleY(0)")};
  transition: all 0.25s ease-in-out;
`;

const Like = styled.div`
  position: relative;
  cursor: pointer;
  background: ${(props) => (props.open ? "#ededed" : "#d3d3d3")};
  /* :hover {
    background: #d3d3d3;
  } */
  width: 80px;
  /* left: 10px; */
  outline: none;
  border-radius: 10px;
`;

const Image = styled.img`
  width: 35px;
  height: 35px;
  object-fit: cover;
  cursor: pointer;
  margin: 3px;
  &:hover {
    transform: scale(1.5);
    transition: 0.3s;
  }
  z-index: 100000;
`;

// render reactions based on shit
function renderReacts(reacts) {
  const reactObject = images.map((react) => ({
    key: react.key,
    count: reacts[react.key],
  }));
  reactObject.sort(function (a, b) {
    return b.count - a.count;
  });
  var finalObjects = [];
  let tooltip = "";
  let sum = 0;
  for (let i = 0; i < reactObject.length; i++) {
    let obj = reactObject[i];
    if (obj.count == 0) break;
    if (i < 2) finalObjects.push(obj);
    tooltip = tooltip + `${obj.key}:‎‎‏‏‎\u00A0${obj.count}\n`;
    sum += obj.count;
  }
  tooltip = "total:\u00A0" + `${sum}\n` + tooltip;
  return (
    <Tooltip
      content={tooltip}
      padding={5}
      fontSize={6}
      // style={{ whiteSpace: "nowrap" }}
      zIndex={1000000000}
    >
      <div
        className={css`
          width: ${50}px;
          box-sizing: content-box;
          margin-left: 10px;
        `}
      >
        {finalObjects.map((obj) => (
          <img
            className={css`
              width: 18px;
              height: 18px;
              margin: 2px;
            `}
            src={IMAGES_MAP[obj.key]}
          />
        ))}
      </div>
    </Tooltip>
  );
}

function getEmotionNumber(emotion) {
  switch (emotion) {
    case "love":
      return 0;
    case "sad":
      return 1;
    case "like":
      return 2;
    case "angry":
      return 3;
    default:
      return 2;
  }
}
export default class Upvote extends React.Component {
  constructor(props) {
    super(props);
    var selectedReact = "none";
    if (typeof cookies.get(this.props.id) !== "undefined") {
      selectedReact = cookies.get(this.props.id);
    }
    this.state = {
      selected: selectedReact,
      open: false,
      reacts: {
        like: this.props.like,
        love: this.props.love,
        sad: this.props.sad,
        angry: this.props.angry,
        total: this.props.total,
      },
    };
    this.timer = null;
    this.emotionChosen = this.emotionChosen.bind(this);
    this.renderLikeButton = this.renderLikeButton.bind(this);
    this.likeHandler = this.likeHandler.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseClose = this.handleMouseClose.bind(this);
  }

  emotionChosen(newReact) {
    if (this.state.selected === "none") {
      // if no reacts yet, change selected to newReact, increase reacc, increase total.
      const { selected, reacts } = this.state;
      let newReacts = reacts;
      newReacts[newReact] += 1;
      newReacts.total += 1;
      this.setState({ selected: newReact, reacts: newReacts }, () => {
        axios.post(`https://covidstories.dailybruin.com/stories/react/`, {
          pk: this.props.id,
          react: getEmotionNumber(newReact),
        });
      });
    } else {
      // if yes reacts alrdy, change selected to newReact, increase new reacc, decrease current reacc.
      const { selected, reacts } = this.state;
      let prevReact = selected;
      let newReacts = reacts;
      console.log(prevReact);
      newReacts[newReact] += 1;
      newReacts[prevReact] -= 1;
      this.setState({ selected: newReact, reacts: newReacts }, () => {
        axios.post(`https://covidstories.dailybruin.com/stories/react/`, {
          pk: this.props.id,
          react: getEmotionNumber(newReact),
          oldReact: getEmotionNumber(prevReact),
        });
      });
    }
    cookies.set(this.props.id, newReact);
    if (this.state.open) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.setState({ open: false });
      }, 250);
    }
  }

  renderLikeButton() {
    if (this.state.selected === "none") {
      return <div className={css``}>Like</div>;
    } else {
      var url = "Like";
      for (var i = 0; i < images.length; i++) {
        if (images[i].key == this.state.selected) {
          url = images[i].img;
        }
      }
      if (url === "Like") {
        return url;
      } else
        return (
          <div
            className={css`
              display: flex;
              justify-content: center;
              align-items: center;
            `}
          >
            <img
              className={css`
                width: 20px;
                height: 20px;
              `}
              src={url}
            />
            <div
              className={css`
                margin-left: 5px;
              `}
            >
              {this.state.selected.charAt(0).toUpperCase() +
                this.state.selected.slice(1)}
            </div>
          </div>
        );
    }
  }
  likeHandler() {
    if (this.state.selected === "none") {
      // if nothing selected, add a like.
      let newReacts = this.state.reacts;
      newReacts.like += 1;
      newReacts.total += 1;
      axios
        .post(`https://covidstories.dailybruin.com/stories/react/`, {
          pk: this.props.id,
          react: 2,
        })
        .then(() =>
          this.setState({ selected: "like", reacts: newReacts }, () => {})
        );
      cookies.set(this.props.id, "like");
    } else {
      // if something selected, unreact.
      let newReacts = this.state.reacts;
      newReacts.total -= 1;
      newReacts[this.state.selected] -= 1;
      axios
        .post(`https://covidstories.dailybruin.com/stories/react/`, {
          pk: this.props.id,
          oldReact: getEmotionNumber(this.state.selected),
        })
        .then(() =>
          this.setState({
            selected: "none",
            reacts: newReacts,
          })
        );

      cookies.set(this.props.id, "none");
    }
  }
  handleMouseEnter() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({ open: true });
    }, 100);
  }
  handleMouseClose() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({ open: false });
    }, 400);
  }
  render() {
    var img = images.map((image) => (
      <Image
        src={image.img}
        key={image.key}
        onClick={this.emotionChosen.bind(this, image.key)}
      ></Image>
    ));
    return (
      <>
        <div
          className={css`
            display: flex;
            justify-content: flex-start;
            align-items: center;
          `}
        >
          <Like
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseClose}
            open={this.state.selected === "none"}
          >
            {<ImageContainer open={this.state.open}>{img}</ImageContainer>}

            <div
              onClick={this.likeHandler}
              className={css`
                text-align: center;
              `}
            >
              {this.renderLikeButton()}
            </div>
          </Like>
          {renderReacts(this.state.reacts)}
        </div>
      </>
    );
  }
}
