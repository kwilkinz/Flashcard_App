import React, { useEffect } from "react";
import { useState, usseEffect } from "react";

// List of all the decks & delete functionality 
import { listDecks, deleteDeck } from "../utils/api"
//TODO Import deckList 
//TODO import create deck here as well 


function Home() {
//* useStates
const [decks, setDecks] = useState([]);

// useEffects 
useEffect(() => {
    
}, []);
// add history btns 

    return (
        <h1>Home</h1>
    )
}

export default Home;