import React from "react";
import { useParams, Link } from "react-router-dom";

/* ===========================
*            Parent : Home.js
*            SubParent: Study.js (paints on)
*           Children:  none
*              Displays ....  

*  + params (deck, cards)
*  + prints you dont have enough cards
*  + Link to add Cards.js btn 
============================== */

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
