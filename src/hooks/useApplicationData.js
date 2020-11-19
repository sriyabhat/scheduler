
import {useState,useEffect} from "react";
import axios from "axios";

import {getDayOfTheAppointment} from "helpers/selectors";

export default function useApplicationData(){
  const [state, setState] = useState({
    day : "Monday",
    days : [],
    appointments : {},
    interviewers : {}
  })

  const setDay = (day) => setState({...state,day});

  useEffect(() => {
    Promise.all([
      axios.get('api/days'),
      axios.get('api/appointments'),
      axios.get('api/interviewers')
    ])
    .then(response => {     
      setState(prev =>({...prev,days:response[0].data, appointments:response[1].data,interviewers:response[2].data}));             
    }) 
    
  },[])

  const bookInterview = (id,interview,edit) => {    
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    } 
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
       
    
       
      

    return axios.put(`/api/appointments/${id}`,appointment)
    .then((response) => {   
      const selectedDay = getDayOfTheAppointment(state,id);  
      const days = [...state.days];   
      if(!edit) {
        days[selectedDay].spots -= 1;
      }
    
    
    
      setState({...state,appointments,days});      
    })  
  }

  const deleteInterview = (id) => {
    const appointment = {...state.appointments[id],interview: null};
    const appointments = {...state.appointments,[id]: appointment};  
    
    
    return axios.delete(`/api/appointments/${id}`)
    .then((response) => {
      const selectedDay = getDayOfTheAppointment(state,id);
      const days = [...state.days]; 
      days[selectedDay].spots += 1; 
      
      setState({...state,appointments,days});      
    })  
  }

 
  return ({
    state,
    setDay,
    bookInterview,
    deleteInterview
  })

}