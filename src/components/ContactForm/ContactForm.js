import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import { InputWrapper, Input, FormButton } from "./ContactForm.styled";

export class ContactForm extends Component {
  state = {
    name: "",
    number: "",
  };
  nameInputId = uuidv4();

  numberInputId = uuidv4();

  handleChangeName = (event) => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const { name, number } = this.state;
    const newContact = { id: uuidv4(), name: name, number: number };
    this.props.onSubmit(newContact);
    this.reset();
  };
  reset = () => {
    this.setState({ name: "" });
    this.setState({ number: "" });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <InputWrapper>
          <label htmlFor={this.nameInputId}>Name</label>
          <Input
            type="text"
            name="name"
            id={this.nameInputId}
            value={this.state.name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
            onChange={this.handleChangeName}
          />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor={this.numberInputId}>Number</label>
          <Input
            type="tel"
            name="number"
            id={this.numberInputId}
            value={this.state.number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
            onChange={this.handleChangeName}
          />
        </InputWrapper>
        <FormButton type="submit">Add contact</FormButton>
      </form>
    );
  }
}
