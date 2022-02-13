import React from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { readDeck, readCard } from "../utils/api";
import CardForm from "./CardForm";


const EditCard = () => {
    const [deck,setDeck] = useState({});
    const [card, setCard] = useState({});
    const params = useParams();
    const cardId = params.cardId;
    const deckId = params.deckId;

    useEffect(() => {
        setDeck({})
        async function loadData() {
          try {
            const cardFromAPI = await readCard(cardId)
            const deckFromAPI = await readDeck(deckId)
            setCard(cardFromAPI)
            setDeck(deckFromAPI)
          } catch (error) {
              throw error;
          }
        }
        loadData();
    }, [deckId, cardId]);

    const handleChange =({ target }) => {
        const value = target.value;
        setCard({
            ...card,
            [target.name]: value,
        })
    }

    const history = useHistory();
    const handleSubmit = (event) => {
        event.preventDefault();
        async function updateData() {
            try {
                history.push(`/decks/${deckId}`);
            } catch (error) {
                throw error;
            }
        }
        updateData();
    }

  return (
    <div>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item" key="0"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item" key="1"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                <li className="breadcrumb-item active" aria-current="page" key="2">Edit Card {cardId}</li>
            </ol>
        </nav>
        <br />
        <h2>Edit Card</h2>
        <form onSubmit={handleSubmit}>
            <CardForm formData={card} handleChange={handleChange} />
            <Link to={`/decks/${deckId}`} className="btn btn-secondary" style={{ margin: "5px"}}>Cancel</Link>
            <button type="submit" className="btn btn-primary">Save</button>
        </form>
    </div>
  )
}

export default EditCard;
