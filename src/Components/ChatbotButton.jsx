import React, {useState} from "react";
import ChatbotModel from "./ChatbotModal";
import { CSSTransition } from 'react-transition-group';


import classes from "./ChatbotButton.module.css"
import "./animation.css"

const ChatbotButton = (props)=>{
    const [showChatBot, setShowChatBot] = useState(false);
    const [chatMessages, setChatMessages] = useState([{
        text:"Hello, How may i help you"
    }]);

    const chatBotHandler = ()=>{
        setShowChatBot(!showChatBot);
    }

    return (
      <React.Fragment>
        <CSSTransition
          in={showChatBot}
          timeout={500}
          classNames="fademodal"
          unmountOnExit
        >
          <React.Fragment> 
              <ChatbotModel onClick={chatBotHandler} chatMessages={chatMessages} setChatMessages={setChatMessages} showChatBot={showChatBot}/>
          </React.Fragment>
        </CSSTransition>
        <CSSTransition
          in={!showChatBot}
          timeout={500}
          classNames="fade"
          unmountOnExit
        >
          <button className={classes.chatbot__btn} onClick={chatBotHandler}>
            <i className={`material-icons ${classes.icon}`} >expand_more</i>
                    Chat with bot
          </button>
        </CSSTransition>
      </React.Fragment>
    )
};

export default ChatbotButton;

