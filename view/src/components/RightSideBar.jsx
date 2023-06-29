import { useState } from "react";
import { SendOutlined, PictureOutlined } from "@ant-design/icons";
import Recommendation from "./Recommendation";

const RightSideBar = (props) => {
  const { chatId, creds } = props;
  const recommendations = [
    { recommendation: "rec1" },
    { recommendation: "rec2" },
    { recommendation: "rec3" },
    { recommendation: "rec4" },
  ];
  return (
    <aside class="right-side">
      <div class="user-head">
        <h1>Sugestions</h1>
      </div>
      <ul class="chat-list">
        {recommendations.map((el) => (
          <Recommendation recommendation={el.recommendation} />
        ))}
      </ul>
      <footer></footer>
    </aside>
  );
};

export default RightSideBar;
