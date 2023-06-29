const Match = (props) => {
  const { photoUrl, name, isActive, id } = props;

  return (
    <li key={id} class={isActive ? "active" : ""}>
      <a href={`/${id}`}>
        <a class="chat-avatar">
          <img alt="" src={photoUrl} />
        </a>
        <span>{name}</span>
      </a>
    </li>
  );
};

export default Match;
