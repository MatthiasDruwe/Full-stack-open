export const PersonForm = ({ addPerson, handleNewNameChange, newName, handleNewNumberChange, newNumber }) => {
  return (<form onSubmit={addPerson}>
    <div>
      name: <input onChange={handleNewNameChange} value={newName} />
    </div>
    <div>
      number: <input onChange={handleNewNumberChange} value={newNumber} type='tel' />
    </div>
    <div>
      <button type='submit'>add</button>
    </div>
  </form>);
}