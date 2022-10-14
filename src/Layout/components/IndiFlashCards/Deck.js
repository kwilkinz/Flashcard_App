import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../../../utils/api";
import IndiCardList from "./IndiCardList";
import IndiTopCard from "./IndiTopCard";

/* ===========================
*            Parent : Home.js
*            SubParent: Decks.js
*  Children: EditDeck, AddCard, IndiCardList
*              Displays ....  

*  + all the information about each decks. 
*  + path here is: /decks/:deckId 
*  + readDeck() 
*  + NavBarDeck 
*  + 
============================== */
function Deck() {
  // useState / useHistory
  const [indiDecks, setIndiDecks] = useState([]);
  const { deckId } = useParams();

  // useEffect
  useEffect(() => {
    const controller = new AbortController();

    const fetchIndiDecks = async () => {
      try {
        const response = await readDeck(deckId, controller.signal);
        setIndiDecks(response);
      } catch (error) {
        console.log(`Deck.js -> ${error}`);
      }
    };
    fetchIndiDecks();
    return () => controller.abort();
  }, [deckId]);



  //? ===========================

  if (indiDecks && indiDecks.cards && indiDecks.cards.length === 0) {
    return (
      <div>
        <IndiTopCard indiDecks={indiDecks} />
        <div className="col">
          <h2>You have no cards in this deck right now.</h2>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <IndiTopCard indiDecks={indiDecks} />
        <IndiCardList cardsArray={indiDecks.cards} />
      </div>
    );
  }
}

export default Deck;
