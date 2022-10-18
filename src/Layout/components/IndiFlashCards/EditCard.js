import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FormCards from "./FormCards";
import { updateCard, readDeck, readCard } from "../../../utils/api/index";
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
  const [formData, setFormData] = useState(initalForm)
  const history = useHistory();
  const {deckId, cardId} = useParams();
  


//** Fetch DECK Data
useEffect(() => {
  const abortController = new AbortController();
  async function fetchDeckData() {
      const response = await readDeck(deckId, abortController.signal);
      setDeck(response);
  }
  fetchDeckData();
  return () => {
      abortController.abort();
  }
}, [deckId]);


// ** Fetch CARD Data
useEffect(() => {
  const controller = new AbortController();

  const cardInfo = async () => {
    const response = await readCard(cardId, controller.signal);
    setCard(response);
    setFormData(response)
  };
  cardInfo();
  return () => controller.abort();
}, [cardId]);


//** Text Changes
function handleTextChange({target}) {
  setFormData({...formData, 
  [target.name]: target.value,
  })
}


//** Handle On Submit (save btn)
  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateCard({...card, front: formData.front, back: formData.back})
    history.push(`/decks/${deckId}`);
  };



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

      
        <FormCards 
          deck={deck}
          card={card}
          handleTextChange={handleTextChange}
          formData={formData}
          handleSubmit={handleSubmit}
          />
      </div>
    
  );
}

export default EditCard;
