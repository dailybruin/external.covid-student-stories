import React from "react";
import { css } from "emotion";
import styled from "styled-components";
import Cookies from "universal-cookie";

const cookies = new Cookies();
var images = [
  { key: "like", img: "http://i.imgur.com/LwCYmcM.gif" },
  { key: "love", img: "http://i.imgur.com/k5jMsaH.gif" },
  { key: "haha", img: "http://i.imgur.com/f93vCxM.gif" },
  { key: "yay", img: "http://i.imgur.com/a44ke8c.gif" },
  { key: "wow", img: "http://i.imgur.com/9xTkN93.gif" },
  { key: "sad", img: "http://i.imgur.com/tFOrN5d.gif" },
  { key: "angry", img: "http://i.imgur.com/1MgcQg0.gif" },
];

const ImageContainer = styled.div`
  width: 200px;
  height: 30px;
  position: absolute;
  left: -15px;
  bottom: 15px;
  background: white;
  border-radius: 28px;
  border-style: outset;
  text-align: center;
  transition: opacity 0.2s ease-in-out;
  opacity: 0;
  height: 0;
  overflow: hidden;
  :hover {
    opacity: 1;
    height: auto;
  }
`;

const Like = styled.button`
  position: relative;
  :hover ${ImageContainer} {
    transition-delay: 0.6s;
    opacity: 1;
    height: auto;
  }
  :hover {
    background: #d3d3d3;
  }
  width: 30px;
  left: 30px;
  border-style: solid;
  outline: none;
`;
const Image = styled.img`
  max-width: 20px;
  margin: 2px;
  &:hover {
    transform: scale(1.5);
  }
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
              max-width: 15px;
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
        <div>
          <div>Reaction Count</div>
          <div>
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
            <div>You selected:{this.state.selected}</div>
          </div>
        </div>
      </>
    );
  }
}
