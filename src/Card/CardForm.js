import React from 'react';

export const CardForm = ({formData, handleChange}) => {
  return (
    <div>
        <label>
            Front:
        </label>
        <br />
            <textarea
            id='front'
            name='front'
            type='text'
            rows='3'
            onChange={handleChange}
            value={formData.front}
            style={{width: "100%"}}
            />
        <br />
        <label>
            Back:
        </label>
        <br />
            <textarea
            id='back'
            name='back'
            type='text'
            rows='3'
            onChange={handleChange}
            value={formData.back}
            style={{width: "100%"}}
            />
            
    </div>
  )
}

export default CardForm;
