import React from "react";
import { useParams, Link } from "react-router-dom";


/* ========================== 
Displayed: Within DisplayIndiCard() 

^ below is if user only has 2 cards in deck,
needs to create 3
========================== */
function NotEnoughCards({ deck, cards }) {
  const { deckId } = useParams();

  return (
    <div>
      <h2>{deck.name}: Study</h2>
      <h4>Not enough cards.</h4>
      <p>You need at least 3 cards to study. There are {cards.length} cards in this deck.</p>
      <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary mx-1">
        + Add Cards
      </Link>
    </div>
  )
}

export default NotEnoughCards;
