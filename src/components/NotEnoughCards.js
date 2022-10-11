import React from "react";
import { useParams, Link } from "react-router-dom";


/* ========================== 
Displayed: Within DisplayIndiCard() 

^ below is if user only has 2 cards in deck,
needs to create 3
========================== */
function NotEnoughCards({ deck }) {
  const { deckId } = useParams();

  return (
    <div className="container">
      <div className="card-body">
        <h1>Not enough cards.</h1>
      </div>
      <p className="card-text">
        You need at least 3 cards to study. There are {deck.cards.length} cards
        in this deck.
      </p>

      <Link to={`/decks/${deckId}/cards/new`} 
        className="btn btn-primary"
      > 
      Add Cards
      </Link>
    </div>
  );
}

export default NotEnoughCards;
