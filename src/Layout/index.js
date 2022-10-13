import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";

import Header from "./Header";
import Home from "./Home";
import Study from "./Components/StudyDeck/Study";
import CreateDeck from "./Components/CreateDeck/CreateDeck"
import Deck from "./Components/IndiFlashCards/Deck";
import EditDeck from "./Components/IndiFlashCards/EditDeck";
import EditCard from "./Components/IndiFlashCards/EditCard";
import AddCard from "./Components/IndiFlashCards/AddCard";
// import edit deck capabilities
import NotFound from "./NotFound";


function Layout() {
  return (
    <Fragment>
    <div>
      <Header />
      <div className="container">
        {/* Ref App() all routes here */}
        <Switch>
          <Route exact path="/" >
            <Home />
          </Route>

          <Route path={`/decks/new`} >
            <CreateDeck />
          </Route>

          <Route exact path={`/decks/:deckId`} >
            <Deck />
          </Route>

          <Route exact path={`/decks/:deckId/study`} >
            <Study />
          </Route>


          <Route exact path={`/decks/:deckId/edit`} >
            <EditDeck />
          </Route>

          <Route exact path={`/decks/:deckId/cards/new`} >
            <AddCard />
          </Route>

          <Route exact path={`/decks/:deckId/cards/:cardId/edit`} >
            <EditCard />
          </Route>

          <Route >
            <NotFound />
          </Route>
          
        </Switch>
      
      </div>
    </div>
    </Fragment>
  );
}

export default Layout;
