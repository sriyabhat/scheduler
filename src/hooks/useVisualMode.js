import {useState} from "react";


export default function useVisualMode(initial){
  const [mode,setMode] = useState(initial);
  const [history,setHistory] = useState([]);

  const transition = (newMode, replace = false) => {  
    const updatedHistory = [...history];

    if(!replace) {
      updatedHistory.push(mode);
    }     
    setHistory(updatedHistory);  
    setMode(newMode);     
  }

  const back = () => {
    if(history.length > 0) {
      const updatedHistory = [...history];      
      const prevMode = updatedHistory.pop();
      setMode(prevMode);     
      setHistory(updatedHistory);       
    }    
  }

  return(
    {
      mode,
      transition,
      back   
    }
  );
}