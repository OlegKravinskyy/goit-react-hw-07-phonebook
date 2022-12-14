import PropTypes from 'prop-types';
import css from '../Filter/Filter.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getFilter, filterValue } from '../../redux/contactSlice';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);
  return (
    <>
      <h2 className={css.titleFilter}>Find contacts by name</h2>
      <input
        className={css.inputFilter}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={filter}
        onChange={event =>
          dispatch(filterValue(event.target.value.toLowerCase()))
        }
      />
    </>
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  filterList: PropTypes.func.isRequired,
};

// {
//   filter, filterList;
// }
