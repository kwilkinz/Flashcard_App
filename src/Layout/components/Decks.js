import React from "react";
import { Link } from "react-router-dom";

/* ===========================
*            Parent : Home.js
*       Paints to the Home.js Scren: 

*   +  useState from home in params Decks({})
*   +  HandleDelete in params ({})
*   +  Links to create new deck "/decks/new" 
*   +  Link to View {`/decks/${deck.id}`}
*   +  Link to Study {`/decks/${deck.id}/study`}
*   +  Delete btn that calls handleDelete() 

============================== */  

function Decks({ decks, handleDelete }) {

  return (
    <div>
      <div> 
        <Link to="/decks/new" className="btn btn-secondary m-0 mb-2">
          + Create Deck
        </Link>
      </div>
      {/*here map through decks */}
      {decks.map((deck) => (
        <div key={deck.id} style={{ marginBottom: "20px" }}>
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h2 className="card-title">{deck.name}</h2>
                <p>{deck.cards.length} cards</p>
              </div>
              <p className="card-text">{deck.description}</p>
              
              <Link to={`/decks/${deck.id}`} className="btn btn-secondary mx-1">
                View
              </Link>

              <Link to={`/decks/${deck.id}/study`} className="btn btn-primary mx-1">
                Study
              </Link>

              <button
                className="btn btn-danger"
                style={{ float: "right" }}
                onClick={() => handleDelete(deck)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Decks;
