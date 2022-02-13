import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import EditCard from "../Card/EditCard";
import Home from "./Home";
import Deck from "../Deck/Deck";
import { Route, Switch } from "react-router-dom";
import AddCard from "../Card/AddCard";
import EditDeck from "../Deck/EditDeck";
import CreateDeck from "../Deck/CreateDeck";
import Study from "./Study";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact={true} path='/'> {/* working */}
            <Home />
          </Route>

          <Route path={'/decks/:deckId/study'}> {/* check pathing? url is correct on search bar?*/}
            <Study />
          </Route>

          <Route path={'/decks/new'}> {/* working */}
            <CreateDeck />
          </Route>
         
          <Route path={'/decks/:deckId/cards/:cardId/edit'}> {/* working */}
            <EditCard />
          </Route>
          
          <Route path={'/decks/:deckId/cards/new'}> {/* working */}
            <AddCard />
          </Route>

           
          <Route path={'/decks/:deckId/edit'}> {/* check pathing? url is correct on search bar?*/}
            <EditDeck />
          </Route>

          <Route path={'/decks/:deckId'}> {/* working */}
            <Deck />
          </Route>

          <Route>
            <NotFound />
          </Route>

        </Switch>
      </div>
    </>
  );
}

export default Layout;
