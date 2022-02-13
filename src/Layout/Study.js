import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck } from "../utils/api/index";


const Study = () => {
    const [deck, setDeck] = useState({});
    const [cards, setCard] = useState({});
    const [cardNumber, setCardNumber] = useState(0);
    const [front, setFront] = useState(true);
    const params = useParams();
    const deckId = params.deckId;

    useEffect(() => {
        setCard({});
        async function loadData() {
            try {
                const dataFromAPI = await readDeck(deckId);
                setDeck(dataFromAPI);
                setCard(dataFromAPI.cards);
            } catch (error) {
                throw error;
            }
        }
        loadData()
    }, [deckId])

    const history = useHistory();
    
    function next() {
        if (cardNumber + 1 < cards.length) {
            setCardNumber(cardNumber + 1);
            setFront(true);
        } else {
            const result = window.confirm("Would you like to restart?")
            if (result) {
                setCardNumber(0);
                setFront(true);
            } else {
                history.push('/');
            }
        }
    }

    function flip() {
        setFront(!front);
    }


    if (cards.length > 2) {
        
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item" key="0"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item" key="1"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                        <li className="breadcrumb-item active" aria-current="page" key="2">Study</li>
                    </ol>
                </nav>
                <h2>Study: {deck.name}</h2>
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Card {cardNumber + 1} of  {cards.length}</h4>
                        <p className="card-text">{(front) ?  `${cards[cardNumber].front}` : `${cards[cardNumber].back}`}</p>
                        <button className="btn btn-secondary" onClick={flip}>Flip</button>
                        {(front) ? " " : <button className="btn btn-primary" style={{ margin: "5px"}} onClick={next}>Next</button>}
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item" key="0"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item" key="1"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                        <li className="breadcrumb-item active" aria-current="page" key="2">Study</li>
                    </ol>
                </nav>
                <h2>Study : {deck.name}</h2>
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Not enough cards...</h4>
                        <p className="card-text">You need at least 3 cards to study. There are only {cards.length} cards in the deck</p>
                        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">Add Cards</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Study;