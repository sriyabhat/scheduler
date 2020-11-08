export function getAppointmentsForDay(state, day) {
  
  const filteredDay = state.days.filter(item => item.name === day);
  if(filteredDay.length === 0){
    return [];
  }

  const filteredAppointments = [];
  
  filteredDay[0].appointments.forEach(appointment => {   
    if(state.appointments[appointment]) {
      filteredAppointments.push(state.appointments[appointment]);
    }   
  });
  
  return filteredAppointments;
}

export function getInterview(state,interview) {
  if(!interview) {
    return null;
  }  
  const interviewData = {"student" : interview.student, "interviewer" : state.interviewers[interview.interviewer]  }
  return interviewData;
}

export function getInterviewersForDay(state, day) {
  
  const filteredDay = state.days.filter(item => item.name === day);
  if(filteredDay.length === 0){
    return [];
  }

  const filteredInterviewers = [];
  
  filteredDay[0].interviewers.forEach(interviewer => {   
    if(state.interviewers[interviewer]) {
      filteredInterviewers.push(state.interviewers[interviewer]);
    }   
  });
  
  return filteredInterviewers;
}

export function getDayOfTheAppointment(state,id) {
  let selectedDay = null;
  state.days.forEach((day) => {
    if(day.appointments.find(appointment => appointment === id)) {
      selectedDay = day;
    }
  }); 

  return selectedDay; 
} 
