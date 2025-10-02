import {useEffect, useState} from 'react'
import Filter from "./components/Filter.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Persons from "./components/Persons.jsx";
import axios from "axios";

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
            })
    }, [])

    const addName = (event) => {
        event.preventDefault();
        if(persons.some(person => person.name === newName)) {
            alert(`${newName} is already added to phonebook`)
            return
        }
        setPersons(persons.concat({ name: newName, number: newNumber }))
        setNewName('')
        setNewNumber('')
    }

    const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));
    return (
        <div>
            <h2>Phonebook</h2>

            <Filter filter={filter} setFilter={setFilter}/>
            <h2>Add a new</h2>
            <PersonForm onSubmit={addName} name={newName} setName={setNewName} number={newNumber}
                        setNumber={setNewNumber}/>
            <h2>Numbers</h2>
            <Persons personsToShow={personsToShow}/>
        </div>
    )
}

export default App