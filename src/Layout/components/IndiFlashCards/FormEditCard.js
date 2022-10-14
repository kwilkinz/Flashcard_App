import React, { useEffect, useState } from "react";
import { updateCard } from "../../../utils/api/index";
import { readCard } from "../../../utils/api/index";
import { Link } from "react-router-dom";
import { useParams, useHistory } from "react-router-dom";

/* ===========================
*            Parent : Home.js
*            SubParent: Decks.js
*            other: EditCard is Parent 
*           Children:  
*              Displays ....  

*  + using the form 
============================== */

function FormEditCard({ deck }) {
  const initalForm = {
    front: "",
    back: "",
    deckId: "",
    id: "",
  };

  const [card, setCard] = useState(initalForm);
  const { deckId, cardId } = useParams();
  const history = useHistory();

// TODO: useEffect fetchCardData
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


  //TODO: with a form you need a handle change
  const handleFrontCardChange = ({ target }) => {
    setCard({
      ...card,
      [target.front]: target.value,
    });
  };

  const handleBackCardChange = ({ target }) => {
    setCard({
      ...card,
      [target.back]: target.value,
    });
  };

  // TODO: handle your submit button
  const handleSubmit = async (event) => {
    event.preventDefault();
    const controller = new AbortController();
    await updateCard({ ...card, front: card.front, back: card.back}, controller.signal);
    history.push(`/decks/${deckId}`);
  };

  //TODO: Find out if it is front or back
  function cardFront() {
    return card.front ? card.front : "";
  }

  function cardBack() {
    return card.back ? card.back : "";
  }



  return (
    <div>
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
          />
        </div>

        <Link to={`/decks/${deckId}`} className="btn btn-secondary mr-2">Cancel</Link>
        <button onClick={handleSubmit} className="btn btn-primary">Save</button>  
      </form>
    </div>
  );
}

export default FormEditCard;
