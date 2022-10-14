import React from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { deleteCard } from "../../../utils/api";
/* ===========================
*            Parent : Home.js
*            SubParent: Deck.js
*  Children: EditDeck, AddCard, IndiCardList
*              Displays ....  

*  + handle Delele btn 
*  + cards maping through the flashcards
============================== */

function IndiCardList({ cardsArray }) {
    const { deckId } = useParams();
    const history = useHistory();


    async function handleDelete(card) {
        if (
          window.confirm("Delete this card?\n\nYou will not be able to recover it.")
        ) {
          history.go(0);
          return await deleteCard(card.id);
        }
      }

      
// ============== UI Paint  ===================
  return (
    <div className="col">
    <header>
      <h2>Cards</h2>
    </header>
    
    <div>
      { cardsArray && cardsArray.map(singlecard => {
        return (
          <div className="card" key={singlecard.id}>
            <div className="card-body row">
              <div className="col-6 mb-2">
                <p className="card-text">{singlecard.front}</p>
              </div>
              <div className="col-6">
                <p className="card-text">{singlecard.back}</p>
                <button onClick={() => handleDelete(singlecard)} className="btn btn-danger ml-2 float-right">Delete</button>
                <Link to={`/decks/${deckId}/cards/${singlecard.id}/edit`} className="btn btn-secondary float-right">Edit</Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
    </div>
  );

}
export default IndiCardList;
