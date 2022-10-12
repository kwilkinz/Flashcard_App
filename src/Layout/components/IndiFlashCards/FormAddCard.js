import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams, Link } from "react-router-dom";
import { createCard } from "../../../utils/api";
/* ===========================
*            Parent : Home.js
*            SubParent: Deck.js 
*           OtherParent: AddCards.js
*           Children:  none
*              Displays ....  

*  + Form shown with front and back
*  + using textarea 
*  + save creates new card associated with the deck (updatedeck)
*  + Done user is taken to deck screen

============================== */
export default function FormAddCard({ card, setCard }) {
  const { deckId } = useParams();
  const controller = new AbortController();

  // inital setup
  const initalForm = {
    front: "",
    back: "",
  };

  const [formData, setFormData] = useState({...initalForm});
  const history = useHistory();

  // Handle Text Change
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async(event) => {
      event.preventDefault();
      await createCard(deckId, formData, controller.signal)
      setFormData({...initalForm})
      history.go(0)
  }




  return (
    <div>
      <header>
        <h2>{card.name}: Add Card</h2>
      </header>

      <form>
        <div>
          <label htmlFor="front">Front</label>
          <br />
          <textarea
            id="front"
            type="textarea"
            name="front"
            rows="3"
            onChange={handleChange}
            value={formData.front}
            style={{ width: "100%", marginBottom: "10px" }}
            placeholder="  Front side of card"
          />
          <br />
        </div>

        <div>
          <label htmlFor="back">Back</label>
          <br />
          <textarea
            id="back"
            type="textarea"
            name="back"
            rows="3"
            onChange={handleChange}
            value={formData.back}
            style={{ width: "100%", marginBottom: "10px" }}
            placeholder="  Back side of card"
          />
          <br />
        </div>

        <Link to={`/decks/${deckId}`} className="btn btn-secondary mr-2">
          Done
        </Link>

        <button className="btn btn-primary" onClick={handleSubmit}>Save</button>
      </form>
    </div>
  );
}
