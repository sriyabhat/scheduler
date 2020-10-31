import React , {useState, useEffect} from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList.js"
import Appointment from "components/Appointment";
import InterviewerListItem from "./InterviewerListItem";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png"
      }
    }
  },
  {
    id :3,
    time :"2pm"
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Sriya Bhat",
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png"
      }
    }
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Debbie Neil",
      interviewer: {
        id: 5,
        name: "Sven Jones",
        avatar: "https://i.imgur.com/twYrpay.jpg"
      }
    }
  }
 ];

 const appointmentsList = appointments.map( item => {
   return (<Appointment key = {item.id} {...item}/>)
 });

 
export default function Application(props) { 
  const[day,setDay] = useState("Monday");
  const[days,setDays] = useState([]);

  useEffect(() => {
    axios({
      method : 'GET',
      url : `api/days`
    })
    .then(response => {
      setDays(response.data);     
    })
  },[])

  return (
    <main className="layout">
      <section className="sidebar">
        <img 
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days = {days} day = {day} setDay = {setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentsList}
        <Appointment id = "last" time = "5pm"/>
      </section>
    </main>
  );
}
