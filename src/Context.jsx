import main from "./Gemini";
import React, { useState, createContext } from 'react'

export const Context = createContext()

export const ContextProvider = (props) => {

    const [ input, setInput ] = useState("")
    const [ resultData, setResultData ] = useState("")
    const [ recentPrompt, setRecentPrompt ] = useState("")
    const [ prevPrompt, setPrevPrompt ] = useState([])
    const [ showResult, setShowResult ] = useState(false)
    const [ loading, setLoading ] = useState(false)

    const delayRes = (index, nextWord) => {
        setTimeout(() => {
            setResultData(prev => prev+nextWord);
        }, 75*index)
    }

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    }

    const onSent = async(prompt) =>{
        setShowResult(true);
        setLoading(true)
       
        let res;
        if(prompt !== undefined){
            setRecentPrompt(prompt);
            res = await main(prompt);
        } else {
            setRecentPrompt(input)
            setPrevPrompt(prev=>[...prev,input])
            res = await main(input);
        }
        
        const newResArray = res.split("**");
        let newResponse = ""
        for(let i = 0; i< newResArray.length; i++){
            if(i == 0 || i%2 !== 1){
                newResponse += newResArray[i];
            } else {
                newResponse += "<b>"+newResArray[i]+"</b>";
            }
        }
        const newResponse2 = newResponse.split("*").join("</br>");
        const newResponse3 = newResponse2.split(" ");
        for(let i = 0; i < newResponse3.length; i++){
            delayRes(i, newResponse3[i]+" ");
        }
        setLoading(false)
        setShowResult(true);
    }

    const contextValue = {
        input,
        setInput,
        loading,
        resultData,
        recentPrompt,
        setRecentPrompt,
        prevPrompt,
        setPrevPrompt,
        showResult,
        onSent,
        newChat,
    }

    return (
        <Context.Provider value = {contextValue} >
            {props.children}
        </Context.Provider>
    )
}
