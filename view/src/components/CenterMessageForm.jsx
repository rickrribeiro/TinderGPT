import { useState } from "react";
import Message from "./Message";

const CenterMessageForm = ({ props }) => {
  let { chatId, isNewMatches, messages = [], name } = props;
  if (isNewMatches) {
    name = "New Matches";
  }

  return (
    <aside class="center-side">
      <div class="chat-room-head">
        <h1>{name}</h1>
      </div>
      {messages.map((message) => (
        <Message
          name={message.name}
          message={message.message}
          photoUrl={message.photoUrl}
          isUserMessage={message.isUserMessage}
        ></Message>
      ))}

      <footer>
        <div class="chat-txt">
          <textarea type="text" class="form-control" />
        </div>

        <button class="btn btn-danger" data-original-title="" title="">
          Send
        </button>
      </footer>
    </aside>
  );
};

export default CenterMessageForm;
