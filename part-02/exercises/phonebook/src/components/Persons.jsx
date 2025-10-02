import Person from "./Person.jsx";

const Persons = ({personsToShow}) => <>
    {personsToShow.map(person => (
        <Person key={person.name} name={person.name} number={person.number} />
    ))}
</>;
export default Persons ;