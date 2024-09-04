import React, {useState} from 'react'


const Form = (props) => {
    const {note, addNote} = props
    const [inputValue, setInputValue] = useState('')
    
    const handleInput = (e) => {
        setInputValue(e.target.value)
    }

    const addNotes = (e) => {
    e.preventDefault()
    if(inputValue.trim()){
        addNote(inputValue)
        setInputValue('')
    }
}
  return (
    <div>
        <form onSubmit={addNotes}>
            <input
            type="text"
            value={inputValue}
            onChange={handleInput}
             />
            <button type="submit">Add</button>
        </form>
    </div>
  )
}

export default Form