import React from "react"
import { Link } from "react-router-dom";

function NavBarDeck({ indiDecks }){


    return (
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">{indiDecks.name}
                </li>
            </ol>
        </nav>
    )
}

export default NavBarDeck