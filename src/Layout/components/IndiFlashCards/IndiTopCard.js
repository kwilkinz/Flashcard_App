import React from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { deleteDeck } from "../../../utils/api";
import NavBarDeck from "./NavBarDeck";
/* ===========================
*            Parent : Home.js
*            SubParent: Deck.js
*  Children: EditDeck, AddCard, IndiCardList, IndiTopCard
*              Displays ....  

*  + Only the top portion of the specific card clicked on
*  + delete btn
============================== */

function IndiTopCard({ indiDecks }) {
  const { deckId } = useParams();
  const history = useHistory();

  // Delete Handler - window asking to delete the deck, then if so delete
  async function handleDelete(deck) {
    if (
      window.confirm("Delete this card?\n\nYou will not be able to recover it.")
    ) {
      history.push("/");
      return await deleteDeck(deck.id);
    }
  }

  return (
    <div className="col">
      <NavBarDeck indiDecks={indiDecks} />
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">{indiDecks.name}</h4>
          <p className="card-text">{indiDecks.description}</p>
          <div className="d-flex justify-content-between">
            <div>
              <Link to={`${deckId}/edit`} className="btn btn-secondary mx-1">
                Edit
              </Link>

              <Link
                to={`/decks/${deckId}/study`}
                className="btn btn-primary mx-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-clipboard2-data-fill mr-1 mb-1"
                  viewBox="0 0 16 16">
                  <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5Z" />
                  <path d="M4.085 1H3.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1h-.585c.055.156.085.325.085.5V2a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 2v-.5c0-.175.03-.344.085-.5ZM10 7a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0V7Zm-6 4a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1Zm4-3a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1Z" />
                </svg>
                Study
              </Link>

              <Link
                to={`/decks/${deckId}/cards/new`}
                className="btn btn-primary mx-1"
              >
                + Add Cards
              </Link>
            </div>
            <button
              onClick={() => handleDelete(indiDecks)}
              className="btn btn-danger"
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
          </div>
        </div>
      </div>
      <br />
    </div>
  );
}

export default IndiTopCard;
