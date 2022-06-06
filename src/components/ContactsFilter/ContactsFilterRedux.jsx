import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/contactsSlice';
import { Title, Input } from './ContactsFilter.styled';

export const ContactsFilter = () => {
  const { items, filter } = useSelector(state => state.contacts);
  const dispatch = useDispatch();
  const handleSearchContact = e => {
    // setFilter(e.currentTarget.value);
    // console.log(e.currentTarget.value);
    dispatch(setFilter(e.currentTarget.value));
  };
  return (
    <div>
      <Title>Find contacts by name</Title>
      <Input
        type="text"
        name="filter"
        required
        value={filter}
        onChange={handleSearchContact}
      />
    </div>
  );
};

// ContactsFilter.propTypes = {
//   value: PropTypes.string.isRequired,
//   onSearchContact: PropTypes.func.isRequired,
// };
