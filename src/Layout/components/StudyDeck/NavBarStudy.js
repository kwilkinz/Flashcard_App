import React from "react";
import { Link } from "react-router-dom";

/* ===========================
*            Parent : Home.js
*            SubParent: Study.js (paints on)
*           Children:  none
*              Displays ....  

*  + params {deckId, deck} 
*  + Link to Home Screen 
*  + Link to indi deck curently on 
*  + Bootstrap the current page on

============================== */
function NavBarStudy({ deckId, deck }) {
  
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
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
    </div>
  );
}

export default NavBarStudy;
