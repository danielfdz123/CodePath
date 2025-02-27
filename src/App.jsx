import './App.css';
import Board from '../components/Board';

const App = () => {
  return (
    <div className="App">
      <div className="header">
        <img className="logo" src="images/comnebol.jpg"/>
      </div>
      <h1 className = "heading"> 2026 FIFA World Cup Qualifiers Schedule - COMNEBOL </h1>
      <p className = "desc"> Calling all Soccer fans! We are less than a month away from the next two matchdays for the FIFA 2026 World Cup Qualifiers for the COMNBEOL confederation. After 4 long months, matches start
        <br></br>
        again on March 21st, be sure not to miss out and root for your country! Below you'll find details about the upcoming matches.
      </p>
      <Board/>
    </div>
  );
}

export default App;