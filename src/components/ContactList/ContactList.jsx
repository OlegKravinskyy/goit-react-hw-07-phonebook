import PropTypes from 'prop-types';
import css from '../ContactList/ContactList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getFilter, getItem } from '../../redux/contactSlice';
import { deleteContacts } from '../../redux/contactSlice';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getItem);
  const filter = useSelector(getFilter);

  const contactFilter = () => {
    if (filter === '') {
      return false;
    }
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
  };

  const phoneList = contactFilter() ? contactFilter() : contacts;

  return (
    <ul className={css.contactList}>
      {phoneList.map(contact => (
        <li key={contact.id}>
          {contact.name}: {contact.number}
          <button
            type="button"
            name={contact.id}
            onClick={event => dispatch(deleteContacts(event.target.name))}
            className={css.btn}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  phoneList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  deleteContact: PropTypes.func.isRequired,
};
