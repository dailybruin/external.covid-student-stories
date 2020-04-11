import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { css } from "emotion";
import {
  FacebookShareButton,
  FacebookIcon,
  RedditShareButton,
  RedditIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  WeiboShareButton,
  WeiboIcon,
} from "react-share";
import "bootstrap/dist/css/bootstrap.min.css";

export default class SharePost extends React.Component {
  render() {
    const { row } = this.props;
    return (
      <Dropdown>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
          Share
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>
            <FacebookShareButton
              url={"https://dailybruin.com/"}
              quote={'"' + row.responseAffected + '"'}
              hashtag={"UnifhsedStories"}
            >
              <FacebookIcon size={24} round={true} />
              <div
                className={css`
                  font-size: 18px;
                  float: right;
                `}
              >
                Facebook
              </div>
            </FacebookShareButton>
          </Dropdown.Item>
          <Dropdown.Item>
            <RedditShareButton
              url={"https://dailybruin.com/"}
              title={"Unfinished Stories: COVID"}
            >
              <RedditIcon size={24} round={true} />
              <div
                className={css`
                  font-size: 18px;
                  float: right;
                `}
              >
                Reddit
              </div>
            </RedditShareButton>
          </Dropdown.Item>
          <Dropdown.Item>
            <TwitterShareButton
              url={"https://dailybruin.com/"}
              title={'"' + row.responseAffected + '"'}
              hashtags={["UnfinishedStories"]}
            >
              <TwitterIcon size={24} round={true} />
              <div
                className={css`
                  font-size: 18px;
                  float: right;
                `}
              >
                Twitter
              </div>
            </TwitterShareButton>
          </Dropdown.Item>
          <Dropdown.Item>
            <WhatsappShareButton
              url={"https://dailybruin.com/"}
              title={'"' + row.responseAffected + '"'}
            >
              <WhatsappIcon size={24} round={true} />
              <div
                className={css`
                  font-size: 18px;
                  float: right;
                `}
              >
                Whatsapp
              </div>
            </WhatsappShareButton>
          </Dropdown.Item>
          <Dropdown.Item>
            <WeiboShareButton
              url={"https://dailybruin.com/"}
              title={"'" + row.responseAffected + "'"}
            >
              <WeiboIcon size={24} round={true} />
              <div
                className={css`
                  font-size: 18px;
                  float: right;
                `}
              >
                Weibo
              </div>
            </WeiboShareButton>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
