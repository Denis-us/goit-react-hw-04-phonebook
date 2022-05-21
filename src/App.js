import React, { useState } from "react";
import Form from "./components/Form";
import Section from "./components/Section";
import ContactList from "./components/ContactList";
import Filter from "./components/Filter";

import { v4 as uuidv4 } from "uuid";

function App() {
  const [contacts, setContacts] = useState([
    { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
    { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
    { id: "id-3", name: "Eden Clements", number: "645-17-79" },
    { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
  ])

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
