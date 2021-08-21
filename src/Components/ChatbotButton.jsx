import React, { useState } from "react";
import ChatbotModel from "./ChatbotModal";

import classes from "./ChatbotButton.module.css";

const ChatbotButton = (props) => {
  const [showChatBot, setShowChatBot] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);

  const chatBotHandler = () => {
    setShowChatBot(!showChatBot);
  };

  return (
    <React.Fragment>
      <ChatbotModel
        in={showChatBot}
        onClick={chatBotHandler}
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
      {!showChatBot && (
        <button className={classes.chatbot__btn} onClick={chatBotHandler}>
          <i className={`material-icons ${classes.icon}`}>expand_more</i>
          Chat with bot
        </button>
      )}
    </React.Fragment>
  );
};

export default ChatbotButton;
