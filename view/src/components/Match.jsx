const Match = (props) => {
  const { photoUrl, name, isActive } = props;

  return (
    <li class={isActive ? "active" : ""}>
      <a href="#chat_room.html">
        <a class="chat-avatar" href="#javascript:;">
          <img alt="" src={photoUrl} />
        </a>
        <span>{name}</span>
      </a>
    </li>
  );
};

export default Match;
