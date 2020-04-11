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
  transition: opacity 0.2s ease-in-out;
  opacity: 0;
  height: auto;
  :hover {
    opacity: 1;
  }
`;

const Like = styled.div`
  position: relative;
  ${ImageContainer} {
    pointer-events: none;
  }
  :hover ${ImageContainer} {
    transition-delay: 0.2s;
    opacity: 1;
    pointer-events: auto;
    /* height: auto; */
  }

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
  }
  z-index: 100000;
`;

export default class Upvote extends React.Component {
  constructor(props) {
    super(props);
    var id = "";
    if (typeof cookies.get(this.props.id) !== undefined)
      id = cookies.get(this.props.id);
    var value = cookies.get(this.props.id);
    console.log("value: " + value);
    this.state = {
      selected: id,
      open: false,
    };
    this.emotionChosen = this.emotionChosen.bind(this);
    this.renderLikeButton = this.renderLikeButton.bind(this);
    this.likeHandler = this.likeHandler.bind(this);
  }
  emotionChosen(emotion) {
    this.setState({ selected: emotion });
    cookies.set(this.props.id, emotion);
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
      this.setState({ selected: "like" });
      cookies.set(this.props.id, "like");
    } else {
      this.setState({ selected: "" });
      cookies.set(this.props.id, "");
    }
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
          `}
        >
          <b>Reacc:</b>
          <Like>
            <ImageContainer>{img}</ImageContainer>
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
      </>
    );
  }
}
