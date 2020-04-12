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
import { MAP_year_to_yearName } from "../utils/mappings";
import share_arrow from "../images/share_arrow.png";

export default class SharePost extends React.Component {
  render() {
    const { row } = this.props;
    var post = `${MAP_year_to_yearName[row.year]} ${row.major} student at ${
      row.school
    }\n`;
    if (row.responseAffected) {
      post += `\n𝐇𝐨𝐰 𝐡𝐚𝐬 𝐂𝐨𝐯𝐢𝐝-𝟏𝟗 𝐚𝐟𝐟𝐞𝐜𝐭𝐞𝐝 𝐲𝐨𝐮?\n${row.responseAffected}\n`;
    }
    if (row.responseCommunity) {
      post += `\n𝐇𝐨𝐰 𝐡𝐚𝐬 𝐲𝐨𝐮𝐫 𝐜𝐨𝐦𝐦𝐮𝐧𝐢𝐭𝐲 𝐫𝐞𝐬𝐩𝐨𝐧𝐝𝐞𝐝 𝐭𝐨 𝐭𝐡𝐞 𝐂𝐨𝐯𝐢𝐝-𝟏𝟗 𝐩𝐚𝐧𝐝𝐞𝐦𝐢𝐜?\n${row.responseCommunity}\n`;
    }
    if (row.responseDoneDifferently) {
      post += `\n𝐈𝐬 𝐭𝐡𝐞𝐫𝐞 𝐚𝐧𝐲𝐭𝐡𝐢𝐧𝐠 𝐲𝐨𝐮 𝐭𝐡𝐢𝐧𝐤 𝐲𝐨𝐮𝐫 𝐬𝐜𝐡𝐨𝐨𝐥 𝐨𝐫 𝐜𝐨𝐦𝐦𝐮𝐧𝐢𝐭𝐲 𝐜𝐨𝐮𝐥𝐝/𝐬𝐡𝐨𝐮𝐥𝐝 𝐡𝐚𝐯𝐞 𝐝𝐨𝐧𝐞 𝐝𝐢𝐟𝐟𝐞𝐫𝐞𝐧𝐭𝐥𝐲 𝐫𝐞𝐠𝐚𝐫𝐝𝐢𝐧𝐠 𝐭𝐡𝐢𝐬 𝐬𝐢𝐭𝐮𝐚𝐭𝐢𝐨𝐧?\n${row.responseDoneDifferently}`;
    }

    return (
      <FacebookShareButton
        url={"https://dailybruin.com/"}
        quote={post}
        hashtag={"UnfinishedStories"}
      >
        <div
          className={css`
            font-size: 16px;
            margin-right: 5px;
            float: left;
          `}
        >
          Share
        </div>
        {/* <FacebookIcon size={20} round={true} /> */}
        <img
          src={share_arrow}
          className={css`
            width: 16px;
            height: 16px;
            filter: brightness(150%);
          `}
        />
      </FacebookShareButton>
    );
  }
}
