import Recommendation from "./Recommendation";

const RightSideBar = ({ props }) => {
  const { chatId, creds, recommendations = [] } = props;
  console.log("ADSASDSADS");
  console.log(recommendations);
  return (
    <aside class="right-side">
      <div class="user-head">
        <h1>Sugestions</h1>
      </div>
      <ul class="chat-list">
        {recommendations.map((recommendation) => (
          <Recommendation recommendation={recommendation} />
        ))}
      </ul>
      <footer></footer>
    </aside>
  );
};

export default RightSideBar;
