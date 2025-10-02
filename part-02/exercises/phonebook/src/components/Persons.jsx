import Person from "./Person.jsx";

const Persons = ({personsToShow, deletePerson}) => <>
    {personsToShow.map(person => (
        <Person key={person.name} name={person.name} number={person.number}
                onDeleteClicked={() => deletePerson(person.id)}/>
    ))}
</>;
export default Persons;