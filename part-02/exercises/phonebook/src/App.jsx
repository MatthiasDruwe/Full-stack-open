import { useEffect, useState } from "react";
import Filter from "./components/Filter.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Persons from "./components/Persons.jsx";
import personService from "./services/person.js";
import Notification from "./components/Notification.jsx";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);
  const [notificationId, setNotificationId] = useState(null);

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  const addName = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      let person = persons.find((person) => person.name === newName);
      console.log(person);
      personService
        .updatePerson({ id: person.id, number: newNumber, name: person.name })
        .then((response) => {
          person.number = response.number;
          setNewName("");
          setNewNumber("");
          showNotification(
            `Phonenumber of ${response.name} has changed`,
            false,
          );
        })
        .catch((error) => {
          showNotification(
            `Information of ${person.name} has already been removed from server`,
            true,
          );
        });
      return;
    }
    personService
      .createPerson({ name: newName, number: newNumber })
      .then((response) => {
        setPersons(persons.concat(response));
        setNewName("");
        setNewNumber("");
        showNotification(`Phonenumber added for ${response.name}`, false);
      });
  };

  const showNotification = (message, isError) => {
    setNotification({ message, isError });
    if (notificationId !== null) {
      clearTimeout(notificationId);
    }
    const id = setTimeout(() => {
      setNotification(null);
      setNotificationId(null);
    }, 5000);

    setNotificationId(id);
  };

  const deletePerson = (id) => {
    const user = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${user.name} ?`)) {
      personService
        .deletePerson(id)
        .then((response) => {
          setPersons(persons.filter((person) => person.id !== response.id));
          showNotification(`Phonenumber for ${user.name} deleted`, false);
        })
        .catch((error) => {
          showNotification(
            `Information of ${user.name} has already been removed from server`,
            true,
          );
        });
    }
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase()),
  );
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notification?.message ?? null}
        isError={notification?.isError}
      />
      <Filter filter={filter} setFilter={setFilter} />
      <h2>Add a new</h2>
      <PersonForm
        onSubmit={addName}
        name={newName}
        setName={setNewName}
        number={newNumber}
        setNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
