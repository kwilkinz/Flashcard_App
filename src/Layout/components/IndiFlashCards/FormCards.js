import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
/* ===========================
*            Parent : Home.js
*            SubParent: Decks.js
*            other: Deck.js -> EditCard -> FormEditCard
*           Children:  
*              Displays ....  

*  + using the form 
*  +
============================== */
function FormEditCard({ handleTextChange, formData, handleSubmit }) {
  
    const {deckId} = useParams();
  
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
            onChange={handleTextChange}
            value={formData.front}
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
            onChange={handleTextChange}
            value={formData.back}
            style={{ width: "100%" }}
            placeholder="Back side of Card"
          />
        </div>

        <Link to={`/decks/${deckId}`} className="btn btn-secondary mr-2">
          Cancel
        </Link>
        <button onClick={handleSubmit} className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}

export default FormEditCard;
