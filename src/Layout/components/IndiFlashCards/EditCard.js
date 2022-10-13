import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { readDeck } from "../../../utils/api/index";
import FormEditCard from "./FormEditCard";

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

  const [deck, setDeck] = useState([]);
  const { deckId } = useParams();
  

  // TODO : 1st fetch the information
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

      <div>
        <FormEditCard deck={deck} />
      </div>
    </div>
  );
}

export default EditCard;
