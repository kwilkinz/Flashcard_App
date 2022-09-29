import React, { useEffect, useState } from "react";
import { readDeck } from "../utils/api";
import { useParams, Link } from "react-router-dom";

/* ==========================
When clicked on Study. This should correlate 
to the specific deck id that the user clicked on. 

TODOS: 
* [x] Use the readDeck() from API 
* [] Build a card using classNames & bootstrap
* [] useEffect to get the res from readDeck()
* [x] Boostrap: breadcrumb navigation w/ links
* [] fix the Deck.namme in breadcrumb
* [] Produce: deck length
* [] Produce: deck name
* [] Produce: deck description
* [x] Flip button 
* [] Flip btn : flips card to other side

 ========================== */

function Study() {
  // All work starts here...
  const [deck, setDeck] = useState([]);
  const { deckId } = useParams();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const getCurrentDeck = async (id) => {
      try {
        const getStudy = await readDeck(id, signal);
        setDeck(getStudy);
      } catch (error) {
        console.log(`Uh oh.. retry please! ${error}`);
      }
    };
    getCurrentDeck(deckId);
    return () => controller.abort();
  }, [deckId]);

  // WebPage Print
  return (
    <div>
      {/* Breadcrumbs navagation bar */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>

      {/* Decks.name*/}

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

      {/* create a card box like decks.js*/}
    </div>
  );
}

export default Study;
