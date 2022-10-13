import React from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import {deleteDeck} from "../../../utils/api";
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
                    className="btn btn-primary mx-1"
                  >
                    Study
                  </Link>
    
                  <Link
                    to={`/decks/${deckId}/cards/new`}
                    className="btn btn-primary mx-1"
                  >
                    + Add Cards
                  </Link>
                </div>
                <button onClick={() => handleDelete(indiDecks)} className="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>
          </div>
          <br />
    
          
        </div>
      );
    }

export default IndiTopCard;