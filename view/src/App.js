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
  useEffect(() => {
    dataService.getMatchesWithUnreadMessages().then((response) => {
      setMatches(response);
    });

    dataService.getNewMatches().then((response) => {
      setNewMatches(response);
    });
  }, []);

  const props = {
    chats: [],
    activeChat: 0,
    messages: [],
    matches: matches,
    newMatches: newMatches,
    isNewMatches: true,
  };
  return <TinderGPT props={props} />;
};

export default App;
