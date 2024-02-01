const Recommendation = (props) => {
  const { recommendation } = props;

  return (
    <li>
      <hr />
      <a onClick={() =>{document.getElementById('message-area').value=recommendation}}>{recommendation}</a>
    </li>
  );
};

export default Recommendation;
