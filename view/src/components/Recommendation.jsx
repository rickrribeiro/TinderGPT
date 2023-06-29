const Recommendation = (props) => {
  const { recommendation } = props;

  return (
    <li>
      <hr />
      <a href="#chat-room.html">{recommendation}</a>
    </li>
  );
};

export default Recommendation;
