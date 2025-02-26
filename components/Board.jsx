import React from "react";
import Event from "./Event";

const Board = () => {
    return (
        <div className = "MatchdayBox">
            <h1 className = "MatchdayNum"> Matchday 13 of 18: </h1>
                <div className = "Matches">
                    <Event team1 = "Paraguay" team2 = "Chile" date = "March 20, 2025" time = "7:00 PM" />
                    <Event team1 = "Brazil" team2 = "Colombia" date = "March 20, 2025" time = "8:45 PM" />
                    <Event team1 = "Peru" team2 = "Bolivia" date = "March 20, 2025" time = "9:30 PM" />
                    <Event team1 = "Ecuador" team2 = "Venezuela" date = "March 21, 2025" time = "5:00 PM" />
                    <Event team1 = "Uruguay" team2 = "Argentina" date = "March 21, 2025" time = "7:30 PM" />
                </div>
            <h1 className = "MatchdayNum"> Matchday 14 of 18: </h1>
                <div className = "Matches">
                    <Event team1 = "Bolivia" team2 = "Uruguay" date = "March 25, 2025" time = "4:00 PM" />
                    <Event team1 = "Chile" team2 = "Ecuador" date = "March 25, 2025" time = "8:00 PM" />
                    <Event team1 = "Venezuela" team2 = "Peru" date = "March 25, 2025" time = "8:00 PM" />
                    <Event team1 = "Colombia" team2 ="Paraguay" date = "March 25, 2025" time = "8:00 PM" />
                    <Event team1 = "Argentina" team2= "Brazil" date = "March 25, 2025" time = "8:00 PM" />
                </div>
            <h1 className = "MatchdayNum"> Matchday 15 of 18: </h1>
                <div className = "Matches">
                    <Event team1 = "Colombia" team2 = "Peru" date = "June 4, 2025" time = "<TBD>" />
                    <Event team1 = "Paraguay" team2 = "Uruguay" date = "June 4, 2025" time = "<TBD>" />
                    <Event team1 = "Ecuador" team2 = "Brazil" date = "June 4, 2025" time = "<TBD>" />
                    <Event team1 = "Venezuela" team2 ="Bolivia" date = "June 4, 2025" time = "<TBD>" />
                    <Event team1 = "Chilie" team2= "Argentina" date = "June 4, 2025" time = "<TBD>" />
                </div>
            <h1 className = "MatchdayNum"> Matchday 16 of 18: </h1>
                <div className = "Matches">
                    <Event team1 = "Brazil" team2 = "Paraguay" date = "June 9, 2025" time = "<TBD>" />
                    <Event team1 = "Uruguay" team2 = "Venezuela" date = "June 9, 2025" time = "<TBD>" />
                    <Event team1 = "Peru" team2 = "Ecuuador" date = "June 9, 2025" time = "<TBD>" />
                    <Event team1 = "Argentina" team2 ="Colombia" date = "June 9, 2025" time = "<TBD>" />
                    <Event team1 = "Bolivia" team2= "Chilie" date = "June 9, 2025" time = "<TBD>" />
                </div>
            <h1 className = "MatchdayNum"> Matchday 17 of 18: </h1>
                <div className = "Matches">
                    <Event team1 = "Paraguay" team2 = "Ecuador" date = "September 9, 2025" time = "<TBD>" />
                    <Event team1 = "Argentina" team2 = "Venezuela" date = "September 9, 2025" time = "<TBD>" />
                    <Event team1 = "Uruguay" team2 = "Peru" date = "September 9, 2025" time = "<TBD>" />
                    <Event team1 = "Colombia" team2 ="Bolivia" date = "September 9, 2025" time = "<TBD>" />
                    <Event team1 = "Brazil" team2= "Chilie" date = "September 9, 2025" time = "<TBD>" />
                </div>
            <h1 className = "MatchdayNum"> Matchday 18 of 18: </h1>
                <div className = "Matches">
                    <Event team1 = "Ecuador" team2 = "Argentina" date = "September 14, 2025" time = "<TBD>" />
                    <Event team1 = "Chilie" team2 = "Uruguay" date = "September 14, 2025" time = "<TBD>" />
                    <Event team1 = "Bolivia" team2 = "Brazil" date = "September 14, 2025" time = "<TBD>" />
                    <Event team1 = "Venezuela" team2 ="Colombia" date = "September 14, 2025" time = "<TBD>" />
                    <Event team1 = "Peru" team2= "Paraguay" date = "September 14, 2025" time = "<TBD>" />
                </div>
        </div>
    );
};

export default Board;