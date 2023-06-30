const Match = (props) => {
  const { photoUrl, name, isActive, id,isNewMatch } = props;

  return (
    <li key={id} class={isActive ? "active" : ""}>
      <a href={`/${id}`}>
        <a class="chat-avatar">
          <img alt="" src={photoUrl} />
        </a>
        <span>{name}</span>
        {isNewMatch? "🆕":"💬"}
      </a>
    </li>
  );
};

export default Match;
