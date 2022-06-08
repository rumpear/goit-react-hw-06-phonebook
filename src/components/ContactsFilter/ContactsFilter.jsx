import { useDispatch, useSelector } from 'react-redux';
import { updateFilter } from '../../redux/contactsSlice';
import { Title, Input } from './ContactsFilter.styled';

export const ContactsFilter = () => {
  const { filter } = useSelector(state => state.contacts);
  const dispatch = useDispatch();

  const handleSearchContact = e => {
    dispatch(updateFilter(e.currentTarget.value));
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
