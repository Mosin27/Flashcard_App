import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { readDeck, deleteDeck, readCard, deleteCard } from '../utils/api/index';
import { Link } from 'react-router-dom';


const Deck = () => {
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState({});
    const params = useParams();
    const deckId = params.deckId;

    useEffect(() => {
        setCards({});
        async function loadData() {
            try{
                const dataFromAPI = await readDeck(deckId);
                setDeck(dataFromAPI);
                setCards(dataFromAPI.cards);
            } catch (error) {
                throw error;
            }
        }
        loadData();
    }, [deckId]);

    const history = useHistory();
    const handleDeleteDeck = async () => {
        const result = window.confirm(`Delete deck ID ${deckId}? You will not be able to recover it.`);
        if (result) {
            async function deleteData() {
                try {
                    await deleteDeck(deckId);
                    history.push('/');
                } catch (error) {
                    throw error;
                }
            }
            deleteData();
        }
    };

    const handleDeleteCard = async ({ target }) => {
        const value = target.value;
        const result = window.confirm(`Delete card ID ${value}? You will not be able to recover it.`);

        if (result) {
            async function deleteData() {
                try {
                    await deleteCard(value);
                    const dataFromAPI = await readCard(deckId);
                    setCards(dataFromAPI);
                } catch (error) {
                    throw error;
                }
            }
            deleteData();
        }
    };

    if (cards.length > 0) {
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item" key="0"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page" key="1">{deck.name}</li>
                    </ol>
                </nav>
                <h3>{deck.name}</h3>
                <p>{deck.description}</p>
                <div className='row justify-content-between'>
                    <div className='col-8'>
                        <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary" style={ {margin: "5px"}}>Edit</Link>
                        <Link to={location => ({ ...location, pathname: `/decks/${deckId}/study` })} className="btn btn-primary" style={ {margin: "5px"}}>Study</Link>
                        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary" style={ {margin: "5px"}}>Add Card</Link>
                    </div>
                    <div className='col-2'>
                        <button onClick={handleDeleteDeck} className='btn btn-danger'>Delete</button>
                    </div>
                </div>
                <br />
                <header>
                    <h2>Cards</h2>
                </header>
                <br />
                {cards.map((card) => (
                    <div key={card.id} className='card'>
                        <div className='card-body'>
                            <div className='container'>
                                <div className='row justify-content-start'>
                                    <div className='col-6'>
                                        <h4>Front</h4>
                                        {card.front}
                                    </div>
                                    <div className='col-6' style={{ marginBottom: '50px'}}>
                                        <h4>Back</h4>
                                        {card.back}
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-9'>
                                    </div>
                                    <div className='col-3'>
                                        <Link to={`/decks/${deckId}/cards/${card.id}/edit`} className="btn btn-secondary" style={ {margin: "5px"}}>Edit</Link>
                                        <button onClick={handleDeleteCard} value={card.id} className='btn btn-danger'>Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    } else {
        return (
            <div>
                <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item" key="0"><Link to='/'>Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page" key="1">{deck.name}</li>
                    </ol>
                </nav>
                <h3>{deck.name}</h3>
                <p>{deck.description}</p>
                <div className='row justify-content-between'>
                    <div className='col-8'>
                        <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary" style={ {margin: "5px"}}>Edit</Link>
                        <Link to={`/decks/${deckId}/study`} className="btn btn-primary" style={ {margin: "5px"}}>Study</Link>
                        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary" style={ {margin: "5px"}}>Add Card</Link>
                    </div>
                    <div className='col-2'>
                        <button onClick={handleDeleteDeck} className='btn btn-danger'>Delete</button>
                    </div>
                </div>
                <br />
                <h2>No cards, please add some.</h2>
                </div>
            </div>
        )
    }
  
};

export default Deck;
