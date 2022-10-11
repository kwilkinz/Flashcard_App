import React from "react"
import { Link } from "react-router-dom";

function NavBarDeck({deck}){


    return (
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">fix deck name
                </li>
            </ol>
        </nav>
    )
}

export default NavBarDeck