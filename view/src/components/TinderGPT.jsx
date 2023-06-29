import CenterMessageForm from "./CenterMessageForm";
import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSideBar";

const TinderGPT = (props) => {
  const { chats, activeChat, messages, matches, isNewMatches } = props.props;

  const leftSideBarProps = {
    matches,
  };

  let parsedMessages = [];
  if (isNewMatches) {
    parsedMessages = messages.map((match) => ({
      name: match.name,
      message: match.bio,
      photoUrl: match.photoUrl,
    }));
  } else {
    parsedMessages = messages.map((message) => ({
      name: message.name,
      message: message.message,
      isUserMessage: message.isUserMessage,
    }));
  }

  const centerMessageFormProps = {
    parsedMessages: "Name",
    isNewMatches: isNewMatches,
    messages: parsedMessages,
  };

  const chat = chats && chats[activeChat];

  return (
    <div class="container bootstrap snippets">
      <div class="row">
        <div class="col-md-12">
          <div class="box">
            <div class="chat-room">
              <LeftSideBar props={leftSideBarProps} />
              <CenterMessageForm props={centerMessageFormProps} />
              <RightSideBar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TinderGPT;
