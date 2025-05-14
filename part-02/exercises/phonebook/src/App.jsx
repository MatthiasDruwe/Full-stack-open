import { useState } from 'react'
import { Person } from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])

  const [newName, setNewName] = useState('')
  const handleNewNameChange = (event) => {
    const name = event.target.value
    setNewName(name)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (!persons.find(person => person.name === newName)) {

      const newPerson = {
        name: newName
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
