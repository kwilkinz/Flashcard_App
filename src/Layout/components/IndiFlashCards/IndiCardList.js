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
        {cardsArray &&
          cardsArray.map((singlecard) => {
            return (
              <div className="card" key={singlecard.id}>
                <div className="card-body row">
                  <div className="col-6 mb-2">
                    <p className="card-text">{singlecard.front}</p>
                  </div>
                  <div className="col-6">
                    <p className="card-text">{singlecard.back}</p>
                    <button
                      onClick={() => handleDelete(singlecard)}
                      className="btn btn-danger ml-2 float-right"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-trash3-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                      </svg>
                    </button>
                    <Link
                      to={`/decks/${deckId}/cards/${singlecard.id}/edit`}
                      className="btn btn-secondary float-right"
                    >
                      Edit
                    </Link>
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
