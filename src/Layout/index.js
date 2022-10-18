import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";

import Header from "./Header";
import Home from "./Home";
import Study from "./components/StudyDeck/Study";
import CreateDeck from "./components/CreateDeck/CreateDeck"
import Deck from "./components/IndiFlashCards/Deck";
import EditDeck from "./components/IndiFlashCards/EditDeck";
import EditCard from "./components/IndiFlashCards/EditCard";
import AddCard from "./components/IndiFlashCards/AddCard";
// import edit deck capabilities
import NotFound from "./NotFound";


function Layout() {
  return (
    <Fragment>
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/" >
            <Home />
          </Route>

          <Route exact path={`/decks/new`} >
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
