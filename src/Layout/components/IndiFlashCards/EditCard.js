import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import FormEditCard from "./FormEditCard";
import { updateCard, readCard, readDeck } from "../../../utils/api/index";
import { useParams, useHistory } from "react-router-dom";

/* ===========================
*            Parent : Home.js
*            SubParent: Decks.js
*            other: Deck.js
*           Children:  
*              Displays ....  

*  + using the form 
*  +
============================== */

function EditCard() {

  const initalForm = {
    front: "",
    back: "",
    deckId: "",
    id: "",
  };

  const [deck, setDeck] = useState({name: "", description: "", id: "", cards: []});
  const [card, setCard] = useState(initalForm);
  const { cardId, deckId } = useParams();
  const history = useHistory();
  

//** Fetch DECK Data
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
  //console.log(deckId)
  //console.log(deck.cards) // gets all the cards (3) Array

// ** Fetch CARD Data
useEffect(() => {
    const controller = new AbortController();

    const fetchCardData = async() => {
        try {
            const responseCard = await readCard(cardId, controller.signal);
            setCard(responseCard)
        } catch (error) {
            console.log(`FormEditCard ${error}`)
        }
        return () => {
          controller.abort();
        };
      };
      fetchCardData();
}, [cardId]);


//** Text input Change FRONT
  const handleFrontCardChange = ({ target }) => {
    setCard({
      ...card,
      front: target.value,
    });
  };

//** Text input Change BACK
  const handleBackCardChange = ({ target }) => {
    setCard({
      ...card,
      back: target.value,
    });
  };

//** Handle On Submit (save btn)
  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateCard(card)
    history.push(`/decks/${deckId}`);
  };

//** Function is it the Front OR Back
  function cardFront() {
    return card.front ? card.front : "";
  }

  function cardBack() {
    return card.back ? card.back : "";
  }



  //=========== UI PAGE ========
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
          <li className="breadcrumb-item active">Edit Card</li>
        </ol>
      </nav>

      <div>
        <h2>Edit Card</h2>
      </div>

      <div><div>
      <form>
        <div>
          <br />
          <label htmlFor="front">Front</label>
          <textarea
            id="front"
            type="textarea"
            name="front"
            rows="3"
            onChange={handleFrontCardChange}
            value={cardFront()}
            placeholder="Front side of Card"
            style={{ width: "100%" }}
          />
        </div>
        <br />

        <div>
          <label htmlFor="back">Back</label>
          <textarea
            id="back"
            type="textarea"
            name="back"
            rows="3"
            onChange={handleBackCardChange}
            value={cardBack()}
            style={{ width: "100%" }}
            placeholder="Back side of Card"
          />
        </div>

        <Link to={`/decks/${deckId}`} className="btn btn-secondary mr-2">Cancel</Link>
        <button onClick={handleSubmit} className="btn btn-primary">Save</button>  
      </form>
    </div>
  {/* delete this point above */}
        {/* <FormEditCard deck={deck} /> */}
      </div>
    </div>
  );
}

export default EditCard;
