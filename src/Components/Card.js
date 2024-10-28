import React from 'react';
import '../css/Card.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Card = ({ icon, name, cardtext, readmore }) => {
  return (
    <div className="card mx-auto my-3 shadow-sm custom-hover" style={{ width: '18rem', height: '24rem', background: 'linear-gradient(to top left, #ff7e5f, #feb47b)' }}>
      <div className="card-body d-flex flex-column justify-content-between text-center p-4">
        <div>
          <i>{icon}</i>
          <h5 className="card-title text-white">{name}</h5>
          <p className="card-text text-white">{cardtext}</p>
        </div>
        <a href="#" className="btn btn-light mt-3 align-self-center">{readmore}</a>
      </div>
    </div>
  );
};

export default Card;
