import { useState } from 'react'
import { Person } from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const handleNewNameChange = (event) => {
    const name = event.target.value
    setNewName(name)
  }
  const [newNumber, setNewNumber] = useState('')
  const handleNewNumberChange = (event) => {
    const number = event.target.value
    setNewNumber(number)
  }

  const [filterName, setFilterName] = useState('')
  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (!persons.find(person => person.name === newName)) {

      const newPerson = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(newPerson))
      setNewName('')
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))


  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input onChange={handleFilterNameChange} value={filterName} />
      </div>
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handleNewNameChange} value={newName} />
        </div>
        <div>
          number: <input onChange={handleNewNumberChange} value={newNumber} type='tel' />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      <ul>{
        filteredPersons.map(person =>
          <Person key={person.name} person={person} />
        )}
      </ul>

    </div>
  )

}

export default App
