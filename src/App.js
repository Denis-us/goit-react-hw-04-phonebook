import { useState, useEffect } from "react";
import Form from "./components/Form";
import Section from "./components/Section";
import ContactList from "./components/ContactList";
import Filter from "./components/Filter";

import { v4 as uuidv4 } from "uuid";

const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    return JSON.parse(window.localStorage.getItem(key)) ?? defaultValue
  })

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState]
}



function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', '')

  const [filter, setFilter] = useState('')


  const addContact = (name, number) => {
    if (contacts.find(contact => contact.name === name)) {
      alert(`${name} уже есть в списке ваших контактов`);
      return;
    }

    const contact = {
      id: uuidv4(),
      name,
      number,
    };

    setContacts(prevState => [...prevState, contact]);
  };

  const changeFilter = (event) => {
    setFilter( event.target.value );
  };

  const deleteContact = (contactsId) => {
    setContacts((prevState) => prevState.filter(
        (contact) => contact.id !== contactsId));
  };


  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter((contact) =>
    contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const visibleContacts = getVisibleContacts();


  return (
    <>
    <Section title={"Phonebook"}>
          <Form onSubmit={addContact} />
        </Section>

        <Section title={"Contacts"}>
          <Filter value={filter} onChange={changeFilter} />
          <ContactList
            contacts={visibleContacts}
            onDeleteContact={deleteContact}
          />
        </Section>
    </>
    
  );
}

export default App;
