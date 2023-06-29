const Recommendations = (props) => {
  const { photoUrl, name, isActive } = props;

  return <li class={isActive ? "active" : ""}></li>;
};

export default Recommendations;
