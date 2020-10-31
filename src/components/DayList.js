import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) { 
  console.log(props);
  let {days, day, setDay} = props;

  const dayList = days.map(item => {
    return (
      <DayListItem key = {item.id} name = {item.name} spots = {item.spots} selected = {item.name === day} setDay ={setDay} />
    );
  })

  return (
    <ul>
      {dayList}
    </ul>
  );
}