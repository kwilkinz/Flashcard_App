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
* //console.log(deckCards) // front and back + id
* //console.log(deckCards.length) // gets you #

============================== */

function DisplayIndiCard({ deckId, deck, deckCards }) {

  const history = useHistory();
  const [card, setCards] = useState(0);
  const [flip, setFlip] = useState(true);


 // Handle Next Btn -> appears after 1st flip & -1 is last card
  const handleNextBtn = () => {
    setFlip(true);
    if (card === deckCards.length -1) {
      window.confirm("Click OK to restart the deck.")
        ? setCards(() => 0)
        : history.push("/");
    } else {
      //keep moving forward by 1
      setCards((card) => card + 1);
    }
  };



// ============== UI PAGE ============

  return (
    <div>
      {deck.cards && (
        <div className="row justify-content-center">
          <div className="col">
            <div className="card">
              <div className="card-body">
                {deck.cards.length <= 2 ? (
                  <div>
                    <NotEnoughCards card={card} deck={deck} />
                  </div>
                ) : (  
                  <div>
                    <h2>Study: {deck.name}</h2>
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex justify-content-between">
                          <h5 className="card-title">
                            {`Card ${card + 1} of ${deck.cards.length}`}
                          </h5>
                        </div>
                        
                        <p className="card-text">
                          {flip ? deck.cards[card].front : deck.cards[card].back}
                        </p>
                        
                        <button
                          className="btn btn-secondary mx-2"
                          onClick={() => setFlip(!flip)}
                        >
                          Flip
                        </button>
                      
                        {!flip ? (
                          <button
                            className="btn btn-primary"
                            onClick={handleNextBtn}
                          >
                            Next
                          </button>
                        ) : null}
                        
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DisplayIndiCard;
