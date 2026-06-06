import { useEffect, useState } from 'react'
import Filter from "./components/Filter.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Persons from "./components/Persons.jsx";
import personService from "./services/person.js";

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    useEffect(() => {
        personService
            .getAll()
            .then(response => {
                setPersons(response)
            })
    }, [])

    const addName = (event) => {
        event.preventDefault();
        if (persons.some(person => person.name === newName)) {
            let person = persons.find(person => person.name === newName);
            console.log(person);
            personService.updatePerson({id: person.id, number: newNumber, name: person.name}).
                then(response => {
                    person.number = response.number
                    setNewName('')
                    setNewNumber('')
                })
            return;
        }
        personService
            .createPerson({ name: newName, number: newNumber })
            .then(response => {
                setPersons(persons.concat(response))
                setNewName('')
                setNewNumber('')
            })
    }

    const deletePerson = (id) => {
        const user = persons.find(person => person.id === id)
        if (window.confirm(`Delete ${user.name} ?`)) {
            personService
                .deletePerson(id)
                .then(response => {
                    setPersons(persons.filter(person => person.id !== response.id))
                });
        }
    }

    const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));
    return (
        <div>
            <h2>Phonebook</h2>

            <Filter filter={filter} setFilter={setFilter} />
            <h2>Add a new</h2>
            <PersonForm onSubmit={addName} name={newName} setName={setNewName} number={newNumber}
                setNumber={setNewNumber} />
            <h2>Numbers</h2>
            <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
        </div>
    )
}

export default App