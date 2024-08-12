import {createContext, useContext, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

const ChatContext  = createContext();

const ChatProvider = ({ children }) => {

    const [user, setUser] = useState();
    const history = useHistory();

    useEffect(() =>{
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);

        if (!userInfo) { // if user not logged in 
            history.push('/'); // push to login/signup page (home)
        } // ensures all pages ensure authentication at all times 

    }, [history]); // run when history changes 

    return <ChatContext.Provider value={{ user, setUser }}>
        {children}
        </ChatContext.Provider>
};

export const ChatState = () => {
    return useContext(ChatContext);
};

export default ChatProvider;

