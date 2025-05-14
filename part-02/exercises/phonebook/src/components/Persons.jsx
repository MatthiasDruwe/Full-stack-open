import { Person } from "./Person"

export const Persons = ({ filteredPersons }) => {
  return (<ul>{
    filteredPersons.map(person =>
      <Person key={person.name} person={person} />
    )}
  </ul>)
}