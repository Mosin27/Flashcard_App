import React from 'react';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { createDeck } from '../utils/api';
import DeckForm from './DeckForm';


const CreateDeck = () => {
    const initialFormState = {
        name: "",
        description: "",
    }

    const [formData, setFormData] = useState({...initialFormState});
    const handleChange =({ target }) => {
        const value = target.value;
        setFormData({
            ...formData,
            [target.name]: value,
        })      
    }

    const history = useHistory();
    const handleSubmit = (event) => {
        event.preventDefault();
        async function updateData() {
            try {
                const output = await createDeck(formData)
                history.push(`/decks/${output.id}`)
            } catch (error) {
                throw error;
            }
        }
        updateData()
    }

  return (
    <div>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item" key="0"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item active" aria-current="page" key="1">Create Deck</li>
            </ol>
        </nav>
        <br />
        <h2>Create Deck</h2>
        <form onSubmit={handleSubmit}>
            <DeckForm formData={formData} handleChange={handleChange} />
            <Link to='/' className='btn btn-secondary'style={{ margin: '5px'}}>Cancel</Link>
            <button type='submit' className='btn btn-primary'>Save</button>
        </form>
    </div>
  )
}

export default CreateDeck;