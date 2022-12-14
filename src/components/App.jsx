import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import css from './App.module.css';

export const App = () => {
  return (
    <div className={css.App}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm />
      <Filter />

      <h2 className={css.contacs}>Contacts</h2>
      <ContactList />
    </div>
  );
};
