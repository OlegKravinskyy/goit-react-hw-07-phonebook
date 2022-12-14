import { useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { useSelector, useDispatch } from 'react-redux';
import { filterValue, getItem } from '../../redux/contactSlice';
import { newContacts } from '../../redux/contactSlice';
import css from '../ContactForm/ContactForm.module.css';

const INITIAL_STATE = {
  name: '',
  number: '',
};

export const ContactForm = ({ onSubmit }) => {
  const [{ name, number }, setState] = useState(INITIAL_STATE);
  const dispatch = useDispatch();
  const contacts = useSelector(getItem);

  const handleChange = event => {
    const { name, value } = event.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    reset();
    if (contacts.some(contact => contact.name === newContact.name)) {
      alert(`${newContact.name} is already is contacts`);
      return;
    }

    dispatch(newContacts(newContact));
    dispatch(filterValue(''));

    setState({ ...INITIAL_STATE });
  };

  const reset = () => {
    setState('');
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <label>
        <h2 className={css.name}>Name</h2>
        <input
          className={css.inputName}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleChange}
        />
        <input
          className={css.inputPhone}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleChange}
        />
      </label>
      <button type="submit" className={css.submitName}>
        Add contact
      </button>
    </form>
  );
};
ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
