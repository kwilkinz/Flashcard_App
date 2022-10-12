import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck } from "../../../utils/api";
import FormAddCard from "./FormAddCard";
/* ===========================
*            Parent : Home.js
*            SubParent: Deck.js 
*           Children:  FormAddCard
*              Displays ....  

*  + Allows user to add to the existing deck
*  + readDeck() needs to be loaded
*  + params of deckId 
*  + Navagation with breadcrumbs 

============================== */

function AddCard() {
  const { deckId } = useParams();
  const [card, setCard] = useState([]);
  
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
          <li class="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>

      <div>
          <FormAddCard card={card} setCard={setCard}/>
      </div>

    

      
    </div>
  );
}

export default AddCard;
