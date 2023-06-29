// import { ChatEngine } from "react-chat-engine";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
  useEffect(() => {
    const path = window.location.href.split("3000/");
    dataService.getMatchesWithUnreadMessages().then((response) => {
      console.log(path[1]);
      console.log(response);
      const matches = response.map((el) => ({
        ...el,
        isActive: el.id == path[1] ? true : false,
      }));
      setMatches(matches);
    });
    if (path[1] === "") {
      dataService.getNewMatches().then((response) => {
        setNewMatches(response);
      });
      setIsNewMatches(true);
    } else {
      dataService.getChatMessages(path[1]).then((response) => {
        setMessages(response);
      });
      setIsNewMatches(false);
    }
  }, []);

  const props = {
    chats: [],
    activeChat: 0,
    messages: isNewMatches ? newMatches : messages,
    matches: matches,
    newMatches: newMatches,
    isNewMatches: isNewMatches,
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
