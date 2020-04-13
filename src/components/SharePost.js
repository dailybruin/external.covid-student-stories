import React from "react";
import { css } from "emotion";
import { FacebookShareButton } from "react-share";
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
      post += `\n𝗛𝗼𝘄 𝗵𝗮𝘀 𝗖𝗼𝘃𝗶𝗱-𝟭𝟵 𝗮𝗳𝗳𝗲𝗰𝘁𝗲𝗱 𝘆𝗼𝘂?\n${row.responseAffected}\n`;
    }
    if (row.responseCommunity) {
      post += `\n𝗛𝗼𝘄 𝗵𝗮𝘀 𝘆𝗼𝘂𝗿 𝗰𝗼𝗺𝗺𝘂𝗻𝗶𝘁𝘆 𝗿𝗲𝘀𝗽𝗼𝗻𝗱𝗲𝗱 𝘁𝗼 𝘁𝗵𝗲 𝗖𝗼𝘃𝗶𝗱-𝟭𝟵 𝗽𝗮𝗻𝗱𝗲𝗺𝗶𝗰?\n${row.responseCommunity}\n`;
    }
    if (row.responseDoneDifferently) {
      post += `\n𝗜𝘀 𝘁𝗵𝗲𝗿𝗲 𝗮𝗻𝘆𝘁𝗵𝗶𝗻𝗴 𝘆𝗼𝘂 𝘁𝗵𝗶𝗻𝗸 𝘆𝗼𝘂𝗿 𝘀𝗰𝗵𝗼𝗼𝗹 𝗼𝗿 𝗰𝗼𝗺𝗺𝘂𝗻𝗶𝘁𝘆 𝗰𝗼𝘂𝗹𝗱/𝘀𝗵𝗼𝘂𝗹𝗱 𝗵𝗮𝘃𝗲 𝗱𝗼𝗻𝗲 𝗱𝗶𝗳𝗳𝗲𝗿𝗲𝗻𝘁𝗹𝘆 𝗿𝗲𝗴𝗮𝗿𝗱𝗶𝗻𝗴 𝘁𝗵𝗶𝘀 𝘀𝗶𝘁𝘂𝗮𝘁𝗶𝗼𝗻?\n${row.responseDoneDifferently}`;
    }

    return (
      <FacebookShareButton
        url={"https://covidstories.dailybruin.com"}
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
