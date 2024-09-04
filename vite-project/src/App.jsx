import { useState, useEffect } from 'react'
import Content from './components/Content'
import Form from './components/Form'
import Notification from './components/Notification'
import noteService from './services/notes'
import "./App.css"



function App() {
 // save clicks of each button to its own state
const [note, setNote] = useState([])
console.log('notes', note)
 const [good, setGood] = useState(0)
 const [neutral, setNeutral] = useState(0)
 const [bad, setBad] = useState(0)
 const [inputValue, setInputValue] = useState('')
 const [errormessage, setErrormessage] = useState(null)
 const [success, setSuccess] = useState(false)
 

  const handleGoodClicks = () => {
    console.log('good clicks')
    setGood((data)=>{return data = good + 1})
  }
  const handleNeutralClicks = () => {
    console.log('neutral clicks')
    setNeutral((data)=>{return data = neutral + 1})
  }
  const handleBadClicks = () => {
    console.log('Bad clicks')
    setBad((data)=>{return data = bad + 1})
  }

  const all = good + neutral + bad

  const addNote = (data) => {
    return setNote([...note, data])
  }

  useEffect(()=> {
     noteService.getAll().then(res=>setNote(res.data))
     }, [])

  const handleInput = (e) => {
    setInputValue(e.target.value)
  }

  const createNotes = (e) => {
    e.preventDefault()
    const newData = {
      "content": inputValue,
      "important": false
    }
    if(inputValue.trim().length > 0 ){
      noteService.create(newData)
      .then(res=>{
        console.log(res)
        setNote(note.concat(res.data))
        setSuccess(true)
        setErrormessage(`Note Created succesfully`)
        setTimeout(()=>{setErrormessage(null)}, [5000])
        setInputValue('')
        console.log('post created');
        
      })
    }
  }


  const toggleImportance = (importance, id) => {
    const data = {
        "important": !importance
    };
    noteService.update(id, data)
        .then(res => {
            setSuccess(true);
            setErrormessage(`Note id:'${id}' updated successfully`);
            setTimeout(() => { setErrormessage(null); }, 5000);
            setNote(note.map(note => note.id !== id ? note : res.data));
        })
        .catch(e => {
            setSuccess(false);
            setErrormessage(`Note '${id}' was already removed from server`);
            setTimeout(() => { setErrormessage(null); }, 5000);
            setNote(note.filter(n => n.id !== id));
        });
}

  const deleteNote = (id) => {
    const checkNote = note.find(n => n.id === id);
    if (checkNote) {
        const accept = window.confirm(`Delete ${checkNote.content}?`);
        if (accept) {
            noteService.deleteNote(id)
                .then(() => {
                    setErrormessage(`Note deleted`);
                    setTimeout(() => { setErrormessage(null); }, 4000);
                    setNote(note.filter(n => n.id !== id));
                })
                .catch(err => {
                    setSuccess(false);
                    setErrormessage(`Note '${id}' was already removed from server`);
                    setTimeout(() => { setErrormessage(null); }, 4000);
                });
        }
    }
  }
  

 return (
   <div>
    <h1>Give Feedbacks</h1>
     <button onClick={handleGoodClicks}>Good</button>
     <button onClick={handleNeutralClicks}>Neutral</button>
     <button onClick={handleBadClicks}>Bad</button>
     <h2>Statistics</h2>
     <Content
      good={good}
      neutral={neutral}
      bad={bad}
     />
     <h2 className='note'>Add Note</h2>
     {/* <Form note={note} addNote={addNote}/> */}
     <Notification message={errormessage} success={success}/>
     <ul>
      {note.map((note) => <li key={note.id}>{note.content}<button note={note} onClick={()=>{toggleImportance(note.important, note.id)}} >{note.important ?"important" : "Not important"}</button> <button onClick={()=>{deleteNote(note.id)}}>delete</button></li>)}
     </ul>
     <form onSubmit={createNotes}>
            <input
            type="text"
            value={inputValue}
            onChange={handleInput}
             />
            <button type="submit">Submit post</button>
        </form>
   </div>
 )
}

export default App
