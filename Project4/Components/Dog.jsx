import React from 'react';

function Dog({ image, breed, lifeSpan, temperament, weight, banAttribute }) {
  return (
    <div className="dogCard">
      <h2>{breed}</h2>
      <div className="dogAttributes">
        {lifeSpan && (
          <button className="attributeButton" onClick={() => banAttribute(lifeSpan)}> {lifeSpan} </button>
        )}
        {temperament && (
          <button className="attributeButton" onClick={() => banAttribute(temperament)}>
            {temperament}
          </button>
        )}
        {weight && (
          <button className = "attributeButton" onClick={() => banAttribute(weight)}>
            {weight} lbs
          </button>
        )}
      </div>
        <img className = "dogImage" src={image} alt={breed} />
    </div>
  );
}

export default Dog;
