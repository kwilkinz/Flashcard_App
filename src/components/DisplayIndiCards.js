import React, { useState } from "react";
import NotEnoughCards from "./NotEnoughCards";

function DisplayIndiCard({ deckId, deck }) {
  const [card, setCard] = useState(0);
  const [flipOver, setFlipOver] = useState(true);

  const handleNextBtn = () => {
    setFlipOver(true)
    if (card === deck.cards.length -1){
        console.log("yes cheers")
    }
  }

  if (cards.length <= 2) {
    return (
      <div>
        <NotEnoughCards deck={deck} /> 
      </div>
    );

    
  } else {
    return (
      <div>
        <div className="card">
          <div className="card-body">
            <h5>Card current of length</h5>
            <p>Card description</p>

            <button
              type="button"
              className="btn btn-secondary"
              style={{ marginTop: "10px" }}
            >
              Flip
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default DisplayIndiCard;
