import React from "react";

import classes from "./ChatBlock.module.css"

const ChatBlock = (props) => {
    return(
        <React.Fragment>
            {props.chats.map((chat, i) => {
                return (
                <div className={`${classes.chats}`} key={i}>
                    <p>
                        {chat.text}
                        {chat.link && <a href={chat.link}>click here.</a>}
                    </p>
                </div>);
            })}
        </React.Fragment>
    );
};

export default ChatBlock;