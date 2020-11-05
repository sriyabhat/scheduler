import React  from "react";
import "components/Application.scss";
import DayList from "components/DayList.js"
import Appointment from "components/Appointment";
import  {getAppointmentsForDay,getInterview,getInterviewersForDay}  from "helpers/selectors"; 
import useApplicationData from "hooks/useApplicationData"; 
   
export default function Application(props) { 
  const {state,setDay,bookInterview,deleteInterview} = useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state,state.day);
 
  const appointmentsList = dailyAppointments.map( item => {
    const interviewer = getInterview(state,item.interview);
    return (<Appointment 
              key = {item.id} 
              id = {item.id}
              time = {item.time}
              interview = {interviewer}
              interviewers = {getInterviewersForDay(state,state.day)}
              bookInterview = {bookInterview}
              deleteInterview = {deleteInterview} />)
  });

  
  

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
          <DayList days = {state.days} day = {state.day} setDay = {setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentsList}
        <Appointment id = "last" time = "5pm" />
      </section>
    </main>
  );
}
