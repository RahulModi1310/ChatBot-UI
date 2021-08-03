import React, {useState} from "react";

import classes from "./ChatbotModal.module.css"


const ChatbotModal = (props)=>{
    const [query,setQuery] = useState("");

    //To store input from user with each keystrokes
    const onChangeHandler = (event)=>{
        setQuery(event.target.value);
    }

    const queryHandler = (event)=>{
        event.preventDefault();
        setQuery("");
    }

    return(
        <React.Fragment>
            <div className={classes.chatbot__backdrop} onClick={props.onClick}/>
            <div className={classes.chatbot__container}>

                <div className={classes.chatbot__title}>
                    <h1>TINKERING Lab</h1>
                    <p>Chatbot</p>
                </div>

                <div className={classes.chatbot__chatBlock}>

                    <div id={classes.conversation} className={classes.chatBlock__conversations}>
                        {props.conversation}
                    </div>

                    <form className={classes.chatBlock__form} onSubmit={queryHandler} >
                        <input
                            type="text" 
                            placeholder="Type your message here..."
                            value={query}
                            onChange={onChangeHandler}
                        />

                        <button type="submit" className={classes.send__btn}>
                            <i className="material-icons">send</i>
                        </button>
                    </form>

                </div>
            </div>
        </React.Fragment>
    );
};

export default ChatbotModal;