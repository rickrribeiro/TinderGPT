// import { ChatEngine } from "react-chat-engine";
import { useState, useEffect } from "react";
import "./App.css";
import TinderGPT from "./components/TinderGPT";
import DataService from "./services/data-service";
// const projectID = "1b7801d6-8a66-4be4-a442-89219d833dfc";

const App = () => {
  // if (!localStorage.getItem("auth")) return <LoginForm />;
  const dataService = new DataService();
  const [matches, setMatches] = useState([]);
  const [newMatches, setNewMatches] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isNewMatches, setIsNewMatches] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [activeMatchName, setActiveMatchName] = useState("");
  const [userId, setUserId] = useState("");
  useEffect(() => {
    const path = window.location.href.split("3000/");
    let activeMatchName = "";
    dataService.getMatchesWithUnreadMessages().then((response) => {
      const matches = response.map((el) => {
        const isActive = el.id == path[1] ? true : false;
        if (isActive) {
          setActiveMatchName(el.name);
        }
        return {
          ...el,
          isActive: isActive,
        };
      });

      setMatches(matches);
    });
    if (path[1] === "") {
      dataService.getNewMatches().then((response) => {
        setNewMatches(response);
      });
      dataService.getNewMatchesRecommendations().then((response) => {
        setRecommendations(response);
      });
      setIsNewMatches(true);
    } else {
      dataService.getChatMessages(path[1]).then((response) => {
        setMessages(response);
      });

      dataService.getRecommendations(path[1]).then((response) => {
        setRecommendations(response);
      });

      setUserId(path[1]);

      setIsNewMatches(false);
    }
  }, []);

  const props = {
    messages: isNewMatches ? newMatches : messages,
    matches: matches,
    newMatches: newMatches,
    isNewMatches: isNewMatches,
    recommendations: recommendations,
    activeMatchName: activeMatchName,
    userId: userId,
  };
  // const location = ;
  return (
    <div>
      {/* <h1>{location}</h1> */}
      <TinderGPT props={props} />
    </div>
  );
};

export default App;
