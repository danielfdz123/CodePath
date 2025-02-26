import React from "react";
import Event from "./Event";

const Board = () => {
    return (
        <div className = "MatchdayBox">
            <h1 className = "MatchdayNum"> Matchday 13 of 18: </h1>
                <div className = "Matches">
                    <Event team1 = "Paraguay" team2 = "Chile" time = "March 20 at 7:00 PM" />
                    <Event team1 = "Brazil" team2 = "Colombia" time = "March 20 at 8:45 PM" />
                    <Event team1 = "Peru" team2 = "Bolivia" time = "March 20 at 9:30 PM" />
                    <Event team1 = "Ecuador" team2 = "Venezuela" time = "March 21 at 5:00 PM" />
                    <Event team1 = "Uruguay" team2 = "Argentina" time = "March 21 at 7:30 PM" />
                </div>
        </div>
    );
};

export default Board;