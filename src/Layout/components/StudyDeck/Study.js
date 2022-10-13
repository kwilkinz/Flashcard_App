import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../../../utils/api/index";
import DisplayIndiCard from "./DisplayIndiCards";
import NavBarStudy from "./NavBarStudy";

/* ===========================
*            Parent : Home.js
*            SubParent: This
*           Children:  
*              Displays ....  

*  + user params DeckId and 
*  + NavBarStudy.js  (breadcrumbs)
*  + NotEnoughCards.js (needs 3 cards)
*  + DisplayIndiCard.js (individual cards shown)

============================== */

function Study() {
  // useState -> refers to the data being tracked in the application
  // useParams -> uses URL input & uses it to search for that exact route
  const [deck, setDeck] = useState([]);
  const { deckId } = useParams();

  //useEffect -> what we want to render for each time a user clicks an indi deck using study btn
  useEffect(() => {
    const controller = new AbortController();

    const fetchFlashcards = async () => {
      try {
        const response = await readDeck(deckId, controller.signal);
        setDeck(response);
      } catch (error) {
        console.log(`Study.js -> ${error}`);
      }
    };
    fetchFlashcards();
    return () => controller.abort();
  }, [deckId]);

  //console.log(deck.cards.length)
  // WebPage Print
  return (
    <div className="col">
      <div>
        {/* Breadcrumbs navagation bar Study */}
        <NavBarStudy deckId={deckId} deck={deck} />
      </div>

      <div>
        <DisplayIndiCard deckId={deckId} deck={deck} deckCards={deck.cards} />
      </div>
    </div>
  );
}

export default Study;
