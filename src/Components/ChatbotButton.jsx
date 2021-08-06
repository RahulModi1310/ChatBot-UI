import React, {useState} from "react";
import ChatbotModel from "./ChatbotModel";
import classes from "./ChatbotButton.module.css"

const ChatbotButton = (props)=>{

    const [showChatBot, setShowChatBot] = useState(false);
    const [conversation, setConversation] = useState([]);

    const chatBotHandler = ()=>{
        setShowChatBot(!showChatBot);
    }

    return (
        <React.Fragment>
            {!showChatBot ? <ChatbotModel onClick={chatBotHandler} conversation={conversation} setConversation={setConversation}/> :
            <button className={classes.chatbot__btn} onClick={chatBotHandler}>
                <i className={`material-icons ${classes.icon}`} >expand_more</i>
                Chat with bot
            </button>}
        </React.Fragment>
    )
};

export default ChatbotButton;