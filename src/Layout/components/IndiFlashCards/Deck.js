import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readDeck, deleteDeck } from "../../../utils/api";
import NavBarDeck from "./NavBarDeck";
import { Link } from "react-router-dom";
import IndiCardList from "./IndiCardList";

/* ===========================
*            Parent : Home.js
*            SubParent: Decks.js
*           Children: EditDeck
*              Displays ....  

*  + all the information about each decks. 
*  + path here is: /decks/:deckId 
*  + readDeck() 
*  + NavBarDeck 
*  + 
============================== */
function Deck() {
  // useState / useHistory
  const [indiDecks, setIndiDecks] = useState([]);
  const { deckId } = useParams();
  const history = useHistory();

  // useEffect
  useEffect(() => {
    const controller = new AbortController();

    const fetchIndiDecks = async () => {
      try {
        const response = await readDeck(deckId, controller.signal);
        setIndiDecks(response);
      } catch (error) {
        console.log(`Deck.js -> ${error}`);
      }
    };
    fetchIndiDecks();
    return () => controller.abort();
  }, [deckId]);

  // Delete Handler - window asking to delete the deck, then if so delete
  async function handleDelete(deck) {
    if (
      window.confirm("Delete this card?\n\nYou will not be able to recover it.")
    ) {
      history.go(0);
      return await deleteDeck(deck.id);
    }
  }

  // web page paint
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
            <button onClick={handleDelete} className="btn btn-danger">
              Delete
            </button>
          </div>
        </div>
      </div>
      <br />
        <div>
          <IndiCardList indiDecks={indiDecks}/>
        </div>
    </div>
  );
}

export default Deck;
