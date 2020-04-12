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

const cookies = new Cookies();
var images = [
  { key: "like", img: like },
  { key: "love", img: love },
  { key: "haha", img: haha },
  { key: "wow", img: wow },
  { key: "sad", img: sad },
  { key: "angry", img: angry },
];

const ImageContainer = styled.div`
  width: 300px;
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

  background: ${(props) => (props.open ? "#d3d3d3" : "white")};
  :hover {
    background: #d3d3d3;
  }
  width: 40px;
  left: 10px;
  outline: none;
  border-radius: 10px;
`;
const Image = styled.img`
  max-width: 35px;
  margin: 5px;
  &:hover {
    transform: scale(1.5);
    transition: 0.5s;
  }
  z-index: 100000;
`;

export default class Upvote extends React.Component {
  constructor(props) {
    super(props);
    this.PK = this.props.id;
    var id = "";
    if (typeof cookies.get(this.props.id) !== undefined)
      id = cookies.get(this.props.id);
    var value = cookies.get(this.props.id);
    this.state = {
      selected: id,
      open: false,
    };
    this.timer = null;
    this.likes = this.props.like;
    this.loves = this.props.love;
    this.sads = this.props.sad;
    this.angrys = this.props.angry;
    this.totalReacts = this.props.total;
    this.emotionChosen = this.emotionChosen.bind(this);
    this.renderLikeButton = this.renderLikeButton.bind(this);
    this.likeHandler = this.likeHandler.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseClose = this.handleMouseClose.bind(this);
    this.getEmotionNumber = this.getEmotionNumber.bind(this);
  }
  emotionChosen(emotion) {
    this.setState({ selected: emotion }, () => {
      axios.post(`https://covidstories.dailybruin.com/stories/react/`, {
        pk: this.PK,
        react: this.getEmotionNumber(emotion),
      });
      this.totalReacts++;
    });

    cookies.set(this.props.id, emotion);
    if (this.state.open) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.setState({ open: false });
      }, 250);
    }
  }
  getEmotionNumber(emotion) {
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
  renderLikeButton() {
    if (this.state.selected === "") {
      return <div>Like</div>;
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
          <img
            className={css`
              max-width: 20px;
            `}
            src={url}
          />
        );
    }
  }
  likeHandler() {
    if (this.state.selected === "") {
      this.setState({ selected: "like" }, () => {
        axios.post(`https://covidstories.dailybruin.com/stories/react/`, {
          pk: this.PK,
          react: 2,
        });
      });
      cookies.set(this.props.id, "like");
      this.totalReacts++;
    } else {
      axios.post(`https://covidstories.dailybruin.com/stories/react/`, {
        pk: this.PK,
        old_react: this.getEmotionNumber(this.state.selected),
      });
      this.totalReacts--;
      this.setState({ selected: "" });
      cookies.set(this.props.id, "");
    }
  }
  handleMouseEnter() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({ open: true });
    }, 1000);
  }
  handleMouseClose() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({ open: false });
    }, 1000);
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
        <div>
          <div>{this.totalReacts}</div>
          <div
            className={css`
              display: flex;
            `}
          >
            <b>Reacc:</b>
            <Like
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseClose}
              open={this.state.open}
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
          </div>
        </div>
      </>
    );
  }
}
