import React, { useState } from "react";
import Input from "../Input";
import styles from "./Form.module.css";

import shortid from "shortid";

const Form = ({onSubmit}) => {
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

  const nameInputId = shortid.generate();
  const numberInputId = shortid.generate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(name, number)

    setName("")
    setNumber("")
  };

    return (
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>Name</label>
        <Input
          type={"text"}
          value={name}
          placeholder={"enter your name"}
          name={"name"}
          handleChange={handleChange}
          id={nameInputId}
        />

        <label className={styles.label}>Number</label>
        <Input
          type={"tel"}
          value={number}
          placeholder={"enter your number"}
          name={"number"}
          handleChange={handleChange}
          id={numberInputId}
        />

        <button type="submit">Add contact</button>
      </form>
    );
  }

export default Form;
