import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { CSSTransition } from "react-transition-group";

import ChatBlock from "./ChatBlock";
import IsLoading from "./IsLoading";

import classes from "./ChatbotModal.module.css";
import "./animation.css";
import logo from "../../static/ChatBot/logo.png";

const ChatbotModel = (props) => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);

  //to scroll down on every new chat
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scroll({
        top: messagesEndRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [props.chatMessages]);

  //To store input from user with each keystrokes
  const onChangeHandler = (event) => {
    event.preventDefault();
    setQuery(event.target.value);
  };

  //To get response for entered query
  const queryHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (query !== "") {
      let body = {
        sender: "some_user",
        message: query,
      };
      axios({
        method: "POST",
        url: "http://127.0.0.1:5005/webhooks/rest/webhook",
        data: body,
      })
        .then((response) => {
          let botResponse;
          if (response.data.length !== 0) {
            botResponse = { ...response.data[0].custom };
            if (response.data[1]) {
              botResponse = {
                ...botResponse,
                ishelpfull: response.data[1].custom.text,
              };
            }
          } else {
            botResponse = {
              text: "Sorry, I can't help you with that. :(",
            };
          }

          //storing response in an array with all prev chats
          setIsLoading(false);
          props.setChatMessages((messages) => [
            ...messages,
            {
              text: query,
            },
            botResponse,
          ]);

          // Creating a log for qustion asked
          axios({
            method: "POST",
            url: "http://192.168.251.229:8000/chatbot/",
            data: {
              question_text: query,
              bot_response: JSON.stringify(botResponse),
            },
          })
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
        })
        .catch((err) => {
          setIsLoading(false);
          props.setChatMessages((messages) => [
            ...messages,
            {
              text: query,
            },
            {
              text: "Sorry, something went wrong...",
            },
          ]);
        });
    }
    setQuery("");
  };

  return (
    <React.Fragment>
      <CSSTransition
        unmountOnExit
        in={props.in}
        timeout={500}
        classNames="fade"
      >
        <div className={classes.chatbot__backdrop} onClick={props.onClick} />
      </CSSTransition>
      <CSSTransition
        unmountOnExit
        in={props.in}
        timeout={500}
        classNames="fademodal"
      >
        <div className={classes.chatbot__container}>
          <div className={classes.chatbot__header}>
            <div className={classes.logo}>
              <img src={logo} alt="TINKERING lab logo" />
            </div>
            <div className={classes.chatbot__headerText}>
              <h1>TINKERING Lab</h1>
              <h2>Chatbot</h2>
            </div>
            <button className={classes.chatbot__close}>
              <i className="material-icons" onClick={props.onClick}>
                close
              </i>
            </button>
          </div>

          <div className={classes.chatbot__chatBlock}>
            <div
              ref={messagesEndRef}
              id={classes.conversation}
              className={classes.chatBlock__conversations}
            >
              {/* to show all conversations */}
              {isLoading ? (
                <IsLoading />
              ) : (
                <ChatBlock chats={props.chatMessages} />
              )}
            </div>

            <form className={classes.chatBlock__form} onSubmit={queryHandler}>
              <input
                type="text"
                placeholder="Type your message here..."
                value={query}
                onChange={onChangeHandler}
                required
              />
              <button type="submit" className={classes.send__btn}>
                <i className={`material-icons`}>navigate_next</i>
              </button>
            </form>
          </div>
        </div>
      </CSSTransition>
    </React.Fragment>
  );
};

export default React.memo(ChatbotModel);
