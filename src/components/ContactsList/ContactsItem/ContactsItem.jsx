import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { removeContact } from '../../../redux/contactsSlice';
import { Button, Item, Text } from './ContactsItem.styled';
import { VscClose } from 'react-icons/vsc';

export const ContactsItem = ({ id, name, number }) => {
  const dispatch = useDispatch();
  const handleDeleteContact = currentId => {
    dispatch(removeContact(currentId));
  };

  return (
    <Item>
      <Text>{name}</Text>
      <Text>{number}</Text>
      <Button type="button" onClick={() => handleDeleteContact(id)}>
        <VscClose size={20} />
      </Button>
    </Item>
  );
};

ContactsItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
