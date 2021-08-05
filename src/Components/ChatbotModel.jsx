import React, {useState} from "react";
import axios from "axios";
import classes from "./ChatbotModal.module.css"

var key =0;
const ChatbotModel = (props)=>{
    const [query,setQuery] = useState("");
    const [messages,setMessages] = useState([]);
    const [link,setLink] = useState("");
    //To store input from user with each keystrokes
    const onChangeHandler = (event)=>{
        event.preventDefault();
        setQuery(event.target.value);
    }

    const queryHandler = (event)=>{
        event.preventDefault();
        setLink("");
        if(query!==""){
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
            if(response.data.length!==0){
            let reply = response.data[0].custom.text;
            let newLink = response.data[0].custom.link;
            if(newLink!=undefined){
                setLink(newLink);
            }
            else{
                setLink("");
            }
            setMessages(messages=>[...messages,reply]);    
            
            }
            else{
                alert("Message cannot be empty");
            }
        })
        setQuery("");
    }

    function setText(text){
        if(link==""){
            return <div className="chats" key={key++}>
        <p>{text}</p>

        </div>
        }
        else{
            console.log("This is "+ link);
            return <div className="chats" key={key++}>
            <p>{text}</p>
            
        </div>
         
        }
        
    }
    return(
        <React.Fragment>
            <div className={classes.chatbot__backdrop} onClick={props.onClick}/>
            <div className={classes.chatbot__container}>

                <div className={classes.chatbot__title}>
                    <h1>TINKERING Lab</h1>
                    <h2>Chatbot</h2>
                </div>

                <div className={classes.chatbot__chatBlock}>

                    <div id={classes.conversation} className={classes.chatBlock__conversations}>
                        {messages.map(setText)}
                    {link!=""?<a style={{marginTop:10}} href={link} target="_blank">Click here</a>:null}
                    </div>

                    <form className={classes.chatBlock__form} onSubmit={queryHandler} >
                        <input
                            type="text" 
                            placeholder="Type your message here..."
                            value={query}
                            onChange={onChangeHandler}
                            required
                        />

                        <button type="submit" className={classes.send__btn}><i className={`material-icons`}>send</i></button>
                    </form>

                </div>
            </div>
        </React.Fragment>
    );
};

export default ChatbotModel;