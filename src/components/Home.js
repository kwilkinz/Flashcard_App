import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// List of all the decks & delete functionality 
import { listDecks } from "../utils/api"
import Decks from "./Decks";



function Home() {
// useStates
const [decks, setDecks] = useState([]);

// useEffects 
useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const getData = async() => {
        try {
            const getDecks = await listDecks(signal);
            setDecks(getDecks)
            } catch (error) {
                return `Uh oh.. retry please! ${error}`;
            }
        }
        getData();
        return () => controller.abort();
}, []);


    return (
        <div>
            <Link to="/decks/new">
                <button type="button" className="btn btn-secondary" style={{ marginBottom: "10px"}}>+ Create Deck</button>
                <Decks decks={decks} setDecks={setDecks} />
            </Link>
        </div>
    );
}

export default Home