import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../utils/api/index"
import DisplayIndiCard from "./DisplayIndiCards";
import NavBarStudy from "./NavBarStudy";

/* ==========================
When clicked on Study. This should correlate 
to the specific deck id that the user clicked on. 

Study Screen Display 
 - NavBarStudy    (navigation)
 - NotEnoughCards (need 3 cards)
 - DisplayIndiCard (individual card show)
 ========================== */

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
    <div className="col">
      <div>
      {/* Breadcrumbs navagation bar Study */}
      <NavBarStudy deckId={deckId} deck={deck}/>
    </div>
    <div>
      <DisplayIndiCard deckId={deckId} deck={deck} />
    </div>
    </div>
  );
}

export default Study;
