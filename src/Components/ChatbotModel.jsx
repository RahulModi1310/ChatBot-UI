import React, {useState} from "react";
import axios from "axios";
import classes from "./ChatbotModal.module.css"


const ChatbotModel = (props)=>{
    const [query,setQuery] = useState("");
    const [messages,setMessages] = useState([]);
    //To store input from user with each keystrokes
    const onChangeHandler = (event)=>{
        event.preventDefault();
        setQuery(event.target.value);
    }

    const queryHandler = (event)=>{
        event.preventDefault();
        if(query!=""){
        setMessages(messages=>[...messages,query]);
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
            if(response.data.length!=0){
            let reply = response.data[0].text;
            setMessages(messages=>[...messages,reply]);
        }
        else{
            alert("Message cannot be empty");
        }
        })
    }

    function setText(text){
        return <div className="chats">
        <p>{text}</p>
        </div>
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
                        {messages.map(setText)}
                    </div>

                    <form className={classes.chatBlock__form} onScroll={(e)=>{console.log(e)}} onSubmit={queryHandler} >
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

export default ChatbotModel;