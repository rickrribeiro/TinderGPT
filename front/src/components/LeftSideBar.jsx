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
        Min distance:{" "}
        <input
          id="minDistance"
          type="number"
          defaultValue={sessionStorage.getItem("minDistance") || 0}
          onChange={() => {
            const value = document.getElementById("minDistance").value || 0;
            sessionStorage.setItem("minDistance", value);
          }}
        />
        <br></br>
        Max distance:{" "}
        <input
          id="maxDistance"
          type="number"
          defaultValue={sessionStorage.getItem("maxDistance") || 99999}
          onChange={() => {
            const value = document.getElementById("maxDistance").value || 99999;
            sessionStorage.setItem("maxDistance", value);
          }}
        />
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
            isNewMatch={el.isNewMatch}
          ></Match>
        ))}
      </ul>

      <footer></footer>
    </aside>
  );
};

export default LeftSideBar;
