import React from 'react';
import { Link } from "react-router-dom"
import DeckList from '../Deck/DeckList';
 
const Home = () => {
  return (
    <div>
        <div>
            <Link to="/decks/new" className='btn btn-secondary'>Create Deck</Link>
        </div>
        <br />
        <DeckList />
    </div>
    );
};

export default Home;
