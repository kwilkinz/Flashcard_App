import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck } from "../../../utils/api";
import FormCards from "./FormCards";
import { createCard } from "../../../utils/api";
import { useHistory } from "react-router-dom";
/* ===========================
*            Parent : Home.js
*            SubParent: Deck.js 
*           Children:  Form using: FormCards
*              Displays ....  

*  + Allows user to add to the existing deck
*  + readDeck() needs to be loaded
*  + params of deckId 
*  + Navagation with breadcrumbs 

============================== */

function AddCard() {

  const initalForm = {
    front: "",
    back: "",
    deckId: "",
    id: "",
  };

  const { deckId } = useParams();
  const [card, setCard] = useState([]);
  const [formData, setFormData] = useState(initalForm)
  const controller = new AbortController();
  const history = useHistory();
  
  useEffect(() => {
      const controller = new AbortController();
      
      const fetchData = async() => {
          try {
              const response = await readDeck(deckId, controller.signal);
              setCard(response)
          } catch (error) {
              console.log(`Add Card.js -> ${error}`)
          }
          return () => {
              controller.abort();
          }
      }
      fetchData();
  }, [deckId]);


    // Handle Text Change
    const handleTextChange = ({ target }) => {
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
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{card.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>

      <div>
          <FormCards 
            handleTextChange={handleTextChange}  
            formData={formData}
            handleSubmit={handleSubmit}
          />
      </div> 
    </div>
  );
}

export default AddCard;
