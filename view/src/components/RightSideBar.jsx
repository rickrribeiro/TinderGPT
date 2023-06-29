import { useState } from "react";
import { SendOutlined, PictureOutlined } from "@ant-design/icons";

const RightSideBar = (props) => {
  const { chatId, creds } = props;

  const loadChat = (event) => {};

  return (
    <aside class="right-side">
      <div class="user-head">
        <h1>Sugestions</h1>
      </div>

      <ul class="chat-list">
        <li>
          <a href="#chat-room.html">
            Jonathan Smith
            <span class="text-muted">3h:22m</span>
          </a>
        </li>
        <li>
          <a href="#chat-room.html">
            Jhone Due
            <span class="text-muted">1h:2m</span>
          </a>
        </li>
        <li>
          <a href="#chat-room.html">
            Cendy Andrianto
            <span class="text-muted">2h:32m</span>
          </a>
        </li>
        <li>
          <a href="#chat-room.html">
            Surya Nug
            <span class="text-muted">3h:22m</span>
          </a>
        </li>
        <li>
          <a href="#chat-room.html">
            Monke Lutfy
            <span class="text-muted">1h:12m</span>
          </a>
        </li>
        <li>
          <a href="#chat-room.html">
            Steve Jobs
            {/* <!--<span class="text-muted">3h:22m</span>--> */}
          </a>
        </li>
        <li>
          <a href="#chat-room.html">
            Jonathan Smith
            {/* <!--<span class="text-muted">3h:22m</span>--> */}
          </a>
        </li>
      </ul>
      <footer></footer>
    </aside>
  );
};

export default RightSideBar;
