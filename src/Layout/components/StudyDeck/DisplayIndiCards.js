import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import NotEnoughCards from "./NotEnoughCards";
/* ===========================
*            Parent : Home.js
*            SubParent: Study.js (paints on)
*           Children:  NotEnoughCards.js
*              Displays ....  

*  + params (deckId deck)
*  + next btn when have more than 3 cards
*  + Flip Btn 
*  + After Final card, the screen shows a msg
*  + If user doesnt restart deck, user goes to homescreen
*  + Study deck with 2 or less cards go to not enough cards.js

============================== */

function DisplayIndiCard({ deckId, deck }) {
  // multiple if else statements & 2 return statements
  const history = useHistory();
  const { cards } = deck;
  // useState ->
  const [card, setCards] = useState(0);
  const [flip, setFlip] = useState(true);

  // Handle Next Btn ->
  const handleNextBtn = () => {
    setFlip(true);
    if (card === cards.length) {
      window.confirm("Click OK to restart the deck.")
        ? setCards(() => 0)
        : history.push("/");
    } else {
      //keep moving forward by 1
      setCards((card) => card + 1);
    }
  };
  //console.log(cards.length)
  //console.log("card Length-> " + (cards.length))
  if (cards.length <= 2) {
    return (
      <div>
        <NotEnoughCards 
          cards={cards} 
          deck={deck}
        />
      </div>
    );
  } else {
    return (
      <div>
        <h2>{deck.name}: Study</h2>
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <h5 className="card-title">
                {`Card ${card + 1} of ${cards.length}`}
              </h5>
            </div>

            <p className="card-text">{flip ? cards[card].front : cards[card].back}</p>
            <button className="btn btn-secondary mx-2" onClick={() => setFlip(!flip)}>Flip</button>
            {!flip ? <button className="btn btn-primary" onClick={handleNextBtn}>Next</button>: null}
          </div>
        </div>
      </div>
    );
  }
}

export default DisplayIndiCard;
