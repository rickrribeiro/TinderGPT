const Message = (props) => {
  const { name, message, photoUrl, isUserMessage } = props;
  let userClass = "";
  if (isUserMessage) {
    userClass = "first-part odd";
  } else {
    userClass = "first-part";
  }
  return (
    <div class="group-rom">
      <div class={userClass}>
        {photoUrl ? (
          <img alt="" class="chat-avatar-new-match" src={photoUrl} />
        ) : (
          ""
        )}
        {name}
      </div>
      <div class="second-part">{message}</div>
    </div>
  );
};

export default Message;
