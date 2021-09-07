import React, { Component } from "react";
import { Section } from "./components/Section";
import { ContactForm } from "./components/ContactForm";
import { ContactList } from "./components/ContactList";
import { Filter } from "./components/Filter";

export class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],

    filter: "",
  };

  addContact = (newContact) => {
    const { contacts } = this.state;
    const filteredContact = contacts.find(
      (contact) => contact.name === newContact.name
    );

    filteredContact
      ? alert(`${newContact.name}is already in contacts`)
      : this.setState(({ contacts }) => ({
          contacts: [newContact, ...contacts],
        }));
  };

  deleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  };

  changeFilter = (event) => {
    this.setState({ filter: event.currentTarget.value });
  };

  getVisibleContact = () => {
    const { filter, contacts } = this.state;
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };
  componentDidMount() {
    // console.log("App componentDidMount")
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);
    // console.log(parsedContacts)
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const visibleContacts = this.getVisibleContact();
    const { filter } = this.state;
    return (
      <div>
        <Section title="Phonebook">
          <ContactForm onSubmit={this.addContact} />
        </Section>
        <Section title="Contacts">
          <Filter value={filter} onChange={this.changeFilter} />

          <ContactList
            contacts={visibleContacts}
            onDeleteContact={this.deleteContact}
          />
        </Section>
      </div>
    );
  }
}
