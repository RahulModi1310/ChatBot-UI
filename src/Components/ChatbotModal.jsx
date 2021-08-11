import React, {useState} from "react";
import axios from "axios";
import { CSSTransition } from 'react-transition-group';

import ChatBlock from "./ChatBlock";

import classes from "./ChatbotModal.module.css"
import "./animation.css"
import logo from "../assets/logo.png"



const ChatbotModel = (props)=>{
    const [query,setQuery] = useState("");

    //To store input from user with each keystrokes
    const onChangeHandler = (event)=>{
        event.preventDefault();
        setQuery(event.target.value);
    }

    //To get response for entered query 
    const queryHandler = (event)=>{
        event.preventDefault();
        if(query!==""){
            props.setChatMessages(messages=>[...messages,{
                text:query
            }]);
        }
        let body = {
            "sender":"some_user",
            "message":query
        }
        axios({
            method:"POST",
            url:"http://127.0.0.1:5005/webhooks/rest/webhook",
            data:body
        }).then((response)=>{
            if(response.data.length!==0){
                //storing response in an array with all prev chats
                console.log(response);
                props.setChatMessages(messages=>[...messages,{
                    text : response.data[0].custom.text,
                    link : response.data[0].custom.link
                }]);    
            }
            else{
                props.setChatMessages(messages=>[...messages,{
                    text : "Sorry I can't help you with that.",
                }]);
            }
        }).catch(err=>{
            props.setChatMessages(messages=>[...messages,{
                text : "Sorry, something went wrong...",
            }]);
        })
        setQuery("");
    }

    const nodeRef = React.useRef(null);
    const ref = React.useRef(null);
    return(
        <React.Fragment>
            <CSSTransition
                nodeRef={nodeRef}
                unmountOnExit
                in={props.in}
                timeout={500}
                classNames="fade"
            >
                <div ref={nodeRef} className={classes.chatbot__backdrop} onClick={props.onClick}/>
            </CSSTransition>
            <CSSTransition
                nodeRef={ref}
                unmountOnExit
                in={props.in}
                timeout={500}
                classNames="fademodal"
            >
                <div ref={ref} className={classes.chatbot__container}>

                    <div className={classes.chatbot__title}>
                        <div className={classes.logo}>
                            <img src={logo} alt="TINKERING lab logo" />
                        </div>
                        <div>
                            <h1>TINKERING Lab</h1>
                            <h2>Chatbot</h2>
                        </div>
                        <button className={classes.chatbot__close}>
                            <i className="material-icons" onClick={props.onClick}>close</i>
                        </button>
                    </div>

                    <div className={classes.chatbot__chatBlock}>

                        <div id={classes.conversation} className={classes.chatBlock__conversations}>
                            {/* to show all conversations */}
                            <ChatBlock chats={props.chatMessages}/>
                        </div>

                        <form className={classes.chatBlock__form} onSubmit={queryHandler} >
                            <input
                                type="text" 
                                placeholder="Type your message here..."
                                value={query}
                                onChange={onChangeHandler}
                                required
                            />
                            <button type="submit" className={classes.send__btn}><i className={`material-icons`}>navigate_next</i></button>
                        </form>

                    </div>
                </div>
            </CSSTransition>
        </React.Fragment>
    );
};

export default React.memo(ChatbotModel);