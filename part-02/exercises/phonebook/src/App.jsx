import { useState } from 'react'
import { Person } from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '040-1234567'
    }
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


  return (
    <div>
      <h2>Phonebook</h2>
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
        persons.map(person =>
          <Person key={person.name} person={person} />
        )}
      </ul>

    </div>
  )

}

export default App
