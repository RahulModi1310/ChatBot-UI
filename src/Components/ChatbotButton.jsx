import React, {useState} from "react";

import ChatbotModal from "./ChatbotModal";

import classes from "./ChatbotButton.module.css"

const ChatbotButton = (props)=>{

    const [showChatBot, setShowChatBot] = useState(false);
    const [conversation, setConversation] = useState([]);

    const chatBotHandler = ()=>{
        setShowChatBot(!showChatBot);
    }

    const resetShowHnadler = ()=>{
        setShowChatBot(false);
    }

    return (
        <React.Fragment>
            {showChatBot && <ChatbotModal onClick={resetShowHnadler} conversation={conversation} setConversation={setConversation}/>}
            <button className={classes.chatbot__btn} onClick={chatBotHandler}></button>
        </React.Fragment>
    )
};

export default ChatbotButton;