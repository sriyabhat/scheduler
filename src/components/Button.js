import React from "react";
import classNames from "classnames";

import "components/Button.scss";

export default function Button(props) {
   
   const buttonTypes = {"button--confirm" : props.confirm,"button--danger" : props.danger};   
   const buttonClass = classNames("button",buttonTypes);   
   return <button className = {buttonClass} onClick = {props.onClick} disabled = {props.disabled}>{props.children}</button>;
}
