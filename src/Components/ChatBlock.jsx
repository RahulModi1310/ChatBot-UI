import React from "react";

import classes from "./ChatBlock.module.css";

const ChatBlock = (props) => {
  return (
    <React.Fragment>
      <div className={classes.chats}>
        <p className={classes.initial_payload}>
          Hey, I am <span>TinkerBud</span>, how may I help you?
        </p>
      </div>
      {props.chats.map((chat, i) => {
        return (
          <div className={classes.chats} key={i}>
            <p>{`${chat.text}`}</p>
            {chat.links &&
              chat.links.map((l, k) => {
                return (
                  <p key={k}>
                    {l.linkText} <a href={l.link}>click here.</a>
                  </p>
                );
              })}
            {chat.ishelpfull && <p>{`${chat.ishelpfull}`}</p>}
          </div>
        );
      })}
    </React.Fragment>
  );
};

export default React.memo(ChatBlock);
