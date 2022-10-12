import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// List of all the decks & delete functionality 
import { deleteDeck, listDecks } from "../utils/api"
import Decks from "./components/Decks";

/* ===========================
*             Parent: This
*             Child: Decks.js
*              Displays ....  

*  + path to the home "/" screen
*  + Create Deck btn, clicking bring user to "create deck screen"
*  + Existing Decks shown. 
*  + View btn : Individual Deck Screen
*  + Study btn : Brings user to Indi study screen
*  + Delete btn : Shows warnig msg b4 deleting deck 

============================== */   

function Home() {
// useStates, useHistory 
const [decks, setDecks] = useState([]);
const history = useHistory(); 


// useEffects - fetch All Decks from API
useEffect(() => {
    const controller = new AbortController();

    const fetchAllDecks = async() => {
        try {
            const response = await listDecks(controller.signal);
            setDecks(response)
            } catch (error) {
                console.log(`Home.js -> ${error}`);
            }
        }
        fetchAllDecks();
        return () => controller.abort();
}, []);


// Delete Handler - window asking to delete the deck, then if so delete 
async function handleDelete(deck) {
    if (
      window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
    ) {
      history.go(0);
      return await deleteDeck(deck.id)
    }
  };


    return (
        <div>
            <Decks 
                decks={decks}  
                handleDelete={handleDelete}/>
        </div>
    );
}

export default Home