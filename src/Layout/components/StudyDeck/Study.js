import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../../../utils/api/index"
import DisplayIndiCard from "./DisplayIndiCards";
import NavBarStudy from "./NavBarStudy";
/* ===========================
*            Parent : Home.js
*            SubParent: This
*           Children: 
*              Displays ....  

*  + NavBarStudy.js  (breadcrumbs)
*  + NotEnoughCards.js (needs 3 cards)
*  + DisplayIndiCard.js (individual cards shown)

============================== */

function Study() {
  // useState 
    const [deck, setDeck] = useState([]);
    const { deckId } = useParams();

  //useEffect
    useEffect(() => {
      const abortController = new AbortController();
      const signal = abortController.signal;

      async function getDecks() {
          try{
            const response = await readDeck(deckId, abortController.signal);
            setDeck(response);
          }catch(error){
              console.log(`Error on Study.js ${error}`)
          }
      }
      getDecks();
      return () => abortController.abort()
    }, [deckId]);
 



  // WebPage Print
  return (
    <h1>Study page</h1>
    // <div className="col">
    //   <div>
    //   {/* Breadcrumbs navagation bar Study */}
    //   <NavBarStudy deckId={deckId} deck={deck}/>
    // </div>
    // <div>
    //   <DisplayIndiCard deckId={deckId} deck={deck} />
    // </div>
    // </div>
  );
}

export default Study;
