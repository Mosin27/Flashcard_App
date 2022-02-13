import React from 'react';
import { useState, useEffect } from 'react';
import { listDecks, deleteDeck } from '../utils/api/index';
import { Link } from 'react-router-dom';


const DeckList = () => {
    const [decks, setDecks] = useState([]);
    useEffect(() => {
        async function loadData() {
            try {
                const result = await listDecks();
                setDecks(result);
            } catch (error) {
                throw error;
            }
        }
        loadData();
    }, [] );

    const handleDelete = async ({ target }) => {
        const value = target.value;
        const result = window.confirm(`Delete deck ID ${value}? You won't be able to recover it.`);
        if (result) {
            async function deleteData() {
                try {
                    await deleteDeck(value);
                    const response = await listDecks();
                    setDecks(response); 
                } catch (error) {
                    throw error;
                }
            }
            deleteData();
        }
    };



    if (decks.length > 0) {
        return (
            <div>
                {decks.map((deck) => (
                    <div key={deck.id} className='card'>
                        <div className='container'>
                            <div className='row card-header'>
                                <div className='col-10'>
                                    <h4>{deck.name}</h4>
                                </div>
                                <div className='col-2'>
                                    <p>{deck.cards.length} cards</p>
                                </div>
                            </div>
                        </div>

                    <div className='card-body'>
                        <p className='card-text'>{deck.description}</p>
                        <div className='container'>
                            <div className='row justify-content-between'>
                                <div className='col-4'>
                                    <Link to={`decks/${deck.id}`} className="btn btn-secondary" style={{ margin:"5px"}}>View</Link>
                                    <Link to={`decks/${deck.id}/study`} className="btn btn-primary">Study</Link>
                                </div>
                                <div className='col-1'>
                                    <button className='btn btn-danger' value={deck.id} onClick={handleDelete}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                ))}

            </div>
        )
        
    }  
    return (
        <p style={{ fontSize:'24px' }}>Please add a deck.</p>
    );
};

export default DeckList;
