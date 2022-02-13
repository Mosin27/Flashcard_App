import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams, } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";
import CardForm from "./CardForm";

const AddCard = () => {
    const params = useParams();
    const deckId = params.deckId
    const initialFormState = {
        front: "",
        back: "",
        deckId
    }

    const [deck, setDeck] = useState([]);
    const [formData, setFormData] = useState({ ...initialFormState});


    const handleChange = ({ target }) => {
        const value = target.value;
        setFormData({
            ...formData,
            [target.name]: value,
        })
    }

    useEffect(() => {
        async function loadData() {
            try {
                const dataFromAPI = await readDeck(deckId);
                setDeck(dataFromAPI);
            } catch (error) {
                throw error;
            }
        }
        loadData()
    }, [deckId])

    
    const handleSubmit = (event) => {
        
        event.preventDefault();
        async function updateData() {
            try {
                await createCard(deckId, formData);
                setFormData(initialFormState);
            } catch (error) {
                throw error;
            }
        }
        updateData()
    }

    if (deck) {
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item" key="0"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item" key="1"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                        <li className="breadcrumb-item active" aria-current="page" key="2">Add Card</li>
                    </ol>
                </nav>
                <br />
                <h2>{deck.name}</h2>
                <form onSubmit={handleSubmit}>
                    <CardForm formData={formData} handleChange={handleChange} />
                    <Link to= {`decks/${deckId}`} className="btn btn-secondary" style={{ margin: "5px"}}>Done</Link>
                    <button type="submit" className="btn btn-primary">Save</button>
                </form>
            </div>
        )
    } else {
        return (
            "Loading..."
        )
    }
}

export default AddCard;