import {useEffect, useState} from "react";
import Note from "./components/Note";
import axios from "axios";
import noteService from "./services/notes.js";
import Notification from "./components/Notification.jsx";
import Footer from "./components/Footer.jsx";

const App = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("a new note");
    const [showAll, setShowAll] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    const toggleImportanceOf = (id) => {
        const note = notes.find(n=> n.id === id);
        const changedNote = { ...note, important: !note.important };

        noteService
            .update(id, changedNote)
            .then(response => {
                setNotes(notes.map(note => note.id === id? response : note));
            })
            .catch(error => {
                setErrorMessage(
                    `Note ${note.content} was already removed from server`
                )
                setTimeout(()=>
                    setErrorMessage(null)
                , 5000)
                setNotes(notes.filter(n => n.id !== id));
            });
    }

    useEffect(()=> {
        noteService
            .getAll()
            .then(response => {
                setNotes(response)
            })
    }, [])

    const addNote = (event) => {
        event.preventDefault();
        const noteObject = {
            content: newNote,
            important: 0.5 > Math.random(),
            id: String(notes.length + 1),
        };

        noteService
            .create(noteObject)
            .then(response => {
                setNotes(notes.concat(response));
                setNewNote('');
            })
    };

    const handleNewNote = (event) => {
        console.log(event.target.value);
        setNewNote(event.target.value);
    };

    const notesToShow = showAll ? notes : notes.filter(note => note.important)
    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage} />
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all'}
                </button>
            </div>
            <ul>
                {notesToShow.map((note) => (
                    <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
                ))}
            </ul>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNewNote}/>
                <button type="submit">save</button>
            </form>
            <Footer/>
        </div>
    );
};

export default App;
