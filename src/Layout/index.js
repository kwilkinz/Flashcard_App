import React from "react";
import { Switch, Route } from "react-router-dom";

import Header from "./Header";
import Home from "../components/Home"
import NotFound from "./NotFound";


function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/" >
            <Home />
          </Route>

          <Route path="/decks/:deckId/study" >
            <Study />
          </Route>

          <Route path="/decks/new" >
            <CreateDeck />
          </Route>

          <Route path="/decks/:deckId" >
            <Deck />
          </Route>

          <Route path="/decks/:deckId/edit" >
            <EditDeck />
          </Route>

          <Route path="/decks/:deckId/cards/new" >
            <AddCard />
          </Route>

          <Route path="/decks/:deckId/cards/:cardId/edit" >
            <EditCard />
          </Route>

          <Route >
            <NotFound />
          </Route>
          
        </Switch>
      
      </div>
    </>
  );
}

export default Layout;
