import React from "react";
import { deleteDeck } from "../utils/api/index";
import { Link, useHistory } from "react-router-dom";


function Decks({ decks, setDecks }) {
  const history = useHistory();
  //const { deckId } = useParams();

  // Delete Handler Here
  async function handleDelete(id) {
    if (
      window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
    ) {
      deleteDeck(id);
      setDecks(decks.filter((deck) => deck.id !== id));
      history.push("/")
    }
  };

  /* Correlates to the Home Page. This is 
the All Decks being listed Function. 

TODOS: 
* Map through all the deck.id 
* Build a card using classNames & bootstrap
* Produce deck length
* Produce: deck name
* Produce: deck description
* Create Link to a certain deck w/ id

*/
  return (
    <div>
      {/*here map through decks */}
      {decks.map((deck) => (
        <div key={deck.id} style={{ marginBottom: "20px" }}>
          <div className="card">
            <div className="card-body">
              <p style={{float: "right", color: "gray"}}>{deck.cards.length} cards</p>
              <h2 style={{color: "black"}}>{deck.name}</h2>
              <p style={{color: "black"}}>{deck.description}</p>
              
              <Link to="/decks/:deckId">
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ marginRight: "10px" }}
                >
                  View
                </button>
              </Link>

              <Link to="/decks/:deckId/study">
                <button
                  type="button"
                  className="btn btn-primary"
                >
                  Study
                </button>
              </Link>

              <button
                type="button"
                className="btn btn-danger"
                style={{ float: "right" }}
                onClick={() => handleDelete(deck.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Decks;
