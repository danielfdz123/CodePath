import React, { useState, useEffect } from 'react';
import './App.css';
import Dog from '../Components/Dog'; // Import the Dog component

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
const API_URL = 'https://api.thedogapi.com/v1/images/search';

function App() {
  const [dogData, setDogData] = useState(null);
  const [history, setHistory] = useState([]);
  const [banned, setBanned] = useState([]); 

  const fetchDogData = async () => {
    const response = await fetch(API_URL, {
      headers: { 'x-api-key': ACCESS_KEY },
    });
    const data = await response.json();

    if (data.length > 0) {
      const dogInfo = data[0];
      const breedInfo = dogInfo.breeds[0] || {};
      if (!breedInfo.name) {
        return;
      }

      const newDog = {
        image: dogInfo.url,
        breed: breedInfo.name ,
        lifeSpan: breedInfo.life_span,
        temperament: breedInfo.temperament ? breedInfo.temperament.split(',')[0] : null,
        weight: breedInfo.weight ? breedInfo.weight.imperial : null,
      };

      if (
        !banned.includes(newDog.breed) &&
        !banned.includes(newDog.lifeSpan) &&
        !banned.includes(newDog.temperament) &&
        !banned.includes(`${newDog.weight} lbs`)
      ) 
      {
        setDogData(newDog);
        setHistory((prevHistory) => [...prevHistory, { breed: newDog.breed, data: newDog }]);
      } 
      else 
      {
        fetchDogData();
      }
    }
  };

  const banAttribute = (attribute) => {
    if (attribute && !banned.includes(attribute)) {
      const formattedAttribute = attribute.includes("lbs") ? attribute : `${attribute} lbs`;
      setBanned((prevBanned) => [...prevBanned, formattedAttribute]);
    }
  };
  
  const removeBannedAttribute = (attribute) => {
    setBanned((prevBanned) =>
      prevBanned.filter((item) => item !== attribute)
    );
  };

  const History = (dog) => {
    setDogData(dog); 
  };

  useEffect(() => {
    fetchDogData();
  }, []);

  return (
    <div className="app">
      <div className = "content">
        <div className = "history">
          <h2> History </h2>
          <div className = "dogHistory">
            {history.length > 0 ? ( history.map((dog, index) => (
            <button className="dogLog" key={index}  onClick={() => History(dog.data)}>
              {dog.breed}
            </button>
            ))
          ) : (
            <p> No histroy recorded! </p>
          )}
          </div>
        </div>

        <div className="dog">
          <h1> What the Dog Doing? </h1>
          <h3> Bark Bark Bark Bark Bark Bark Bark Bark </h3>
          {dogData ? ( 
            <Dog 
              breed={dogData.breed} 
              image={dogData.image}
              lifeSpan={dogData.lifeSpan}
              temperament={dogData.temperament}
              weight={dogData.weight}
              banAttribute={banAttribute}
            />
          ) : (
            <p> Loading dog data...</p>
          )}
          <button className = "nextButton" onClick={fetchDogData} >Next Dog</button>
      </div>

      <div className = "banDiv">
        <h2>Banned Attributes</h2>
        <div className = "bannedKeys">
          {banned.length > 0 ? (
            banned.map((attribute, index) => (
              <button className = "bannedList" key={index} onClick={() => removeBannedAttribute(attribute)}>
                {attribute}
              </button>
            ))
          ) : (
            <p> No banned attributes </p>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}

export default App;
