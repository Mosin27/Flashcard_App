import React from 'react'

export const DeckForm = ({formData, handleChange}) => {
  return (
    <div>
        <label>
            Name:
        </label>
        <br />
            <textarea
            id='name'
            name='name'
            type='text'
            rows='3'
            onChange={handleChange}
            value={formData.name}
            style={{width: "100%"}}
            />
        <br />
        <label>
            Description:
        </label>
        <br />
            <input
            id='description'
            name='description'
            type='text'
            rows='3'
            onChange={handleChange}
            value={formData.description}
            style={{width: "100%"}}
            />
            
    </div>
  )
}

export default DeckForm;
