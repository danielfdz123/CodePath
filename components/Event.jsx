import React from "react";

const Event = (props) => {
    return (
        <div className="eventCard">
            <img className = "flag" src={"/images/" + props.team1.toLowerCase() + ".webp"}/>
            <img className = "flag" src={"/images/" + props.team2.toLowerCase() + ".webp"}/>
            <h2> {props.team1} Vs. {props.team2} </h2>
            <p className = "link"> {props.date} <br></br>{props.time} </p>
            <button className = "moreInfo"> More Info </button>
        </div>
    );
};

export default Event;