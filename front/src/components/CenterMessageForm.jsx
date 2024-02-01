import { useState } from "react";
import Message from "./Message";
import DataService from "../services/data-service";

const CenterMessageForm = ({ props }) => {
  let { isNewMatches, messages = [], name, activeMatchName, userId } = props;
  if (isNewMatches) {
    name = "New Matches";
  }

  const dataService = new DataService();

  const sendMessages = (users, message) => {
    // users, message
    console.log(message);
    if (message && message.length > 0) {
      dataService.sendMessage(users, message);
      document.getElementById("message-area").value = "";
    }
  };

  console.log(messages);
  return (
    <aside class="center-side">
      <div class="chat-room-head">
        <h1>{activeMatchName}</h1>
      </div>
      {messages.map((message) => (
        <Message
          name={message.isUserMessage ? "Eu" : activeMatchName}
          message={message.message}
          photoUrl={message.photoUrl}
          isUserMessage={message.isUserMessage}
        ></Message>
      ))}

      <footer>
        <div class="chat-txt">
          <textarea type="text" id="message-area" class="form-control" />
        </div>

        <button
          class="btn btn-danger"
          onClick={() => {
            sendMessages(
              isNewMatches ? messages.map((el) => el.id) : [userId],
              document.getElementById("message-area").value
            );
          }}
          data-original-title=""
          title=""
        >
          Send
        </button>
      </footer>
    </aside>
  );
};

export default CenterMessageForm;
