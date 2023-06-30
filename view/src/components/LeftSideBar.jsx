import { useState } from "react";

import Match from "./Match";

const LeftSideBar = ({ props }) => {
  const { matches } = props;
  // console.log("AAAA");
  // console.log(matches);
  return (
    <aside class="left-side">
      <div class="user-head">
        <h1>🔥 TinderGPT 🤖</h1>
      </div>
      <ul class="chat-list">
        <li class="">
          <a class="lobby" href="/">
            <h1 class="new-matches">Batch Message for New Matches</h1>
          </a>
        </li>
        {matches.map((el) => (
          <Match
            photoUrl={el.photoUrl}
            name={el.name}
            isActive={el.isActive}
            key={el.id}
            id={el.id}
            isNewMatch= {el.isNewMatch}
          ></Match>
        ))}
      </ul>

      <footer></footer>
    </aside>
  );
};

export default LeftSideBar;
