import React, {useState} from "react";
import ChatbotModel from "./ChatbotModel";
import classes from "./ChatbotButton.module.css"

const ChatbotButton = (props)=>{

    const [showChatBot, setShowChatBot] = useState(false);
    const [conversation, setConversation] = useState([]);

    const chatBotHandler = ()=>{
        setShowChatBot(!showChatBot);
    }

    const resetShowHandler = ()=>{
        setShowChatBot(false);
    }

    return (
        <React.Fragment>
            {showChatBot && <ChatbotModel onShow={showChatBot} onClick={resetShowHandler} conversation={conversation} setConversation={setConversation}/>}
            <button className={classes.chatbot__btn} onClick={chatBotHandler}>
            <i className={`material-icons ${classes.icon} ${showChatBot && classes.chatbot__animate}`} >chat</i>
            </button>
        </React.Fragment>
    )
};

export default ChatbotButton;