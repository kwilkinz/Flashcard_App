import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck, updateDeck } from "../../../utils/api";

/* ===========================
*            Parent : Home.js
*            SubParent: Decks.js
*            other: Deck.js
*           Children:  
*              Displays ....  

*  + display the deckId 
*  + use the readDeck()
*  + navagation bar 
*  + same form as Create Deck screen, except info is pre-filled
*  + cancel = back to home. 
============================== */

function EditDeck() {
  // inital setup
  const initalForm = {
    name: "",
    description: "",
  };

  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState(initalForm);

  // useEffect
  useEffect(() => {
    const controller = new AbortController();

    const fetchEditDeck = async () => {
      try {
        const response = await readDeck(deckId, controller.signal);
        setDeck(response);
      } catch (error) {
        console.log(`Edit Decks -> ${error}`);
      }
      return () => {
        controller.abort();
      };
    };
    fetchEditDeck();
  }, [deckId]);

  // Handle Text Change
  const handleChange = ({ target }) => {
    setDeck({
      ...deck,
      [target.name]: target.value,
    });
  };

  // handle Submit button
  async function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    const response = await updateDeck({ ...deck }, abortController.signal);
    history.push(`/decks/${deckId}`);
    return response;
}

  // Paint UI
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active">Edit Deck</li>
        </ol>
      </nav>

      <header>
        <h2>Edit Deck</h2>
      </header>

      <div>
        <form>
          <div>
            <label htmlFor="name">Name</label>
            <br />
            <input
              id="name"
              type="text"
              name="name"
              onChange={handleChange}
              value={deck.name}
              style={{ width: "100%" }}
            />
          </div>
          <br />

          <div>
            <label htmlFor="description">Description</label>
            <br />
            <textarea
              id="description"
              type="textarea"
              name="description"
              rows="3"
              onChange={handleChange}
              value={deck.description}
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <br />

            <Link to={`/decks/${deckId}`} class="btn btn-secondary mr-3">
              Cancel
            </Link>

            <button
              class="btn btn-primary"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditDeck;
