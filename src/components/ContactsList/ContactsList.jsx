import { List, Text } from './ContactsList.styled';
import { useSelector } from 'react-redux';
import { ContactsItem } from './ContactsItem';
import { getContactsValue, getFilterValue } from '../../redux/contactsSlice';

export const ContactsList = () => {
  const contacts = useSelector(getContactsValue);
  const filterValue = useSelector(getFilterValue);

  const filteredContacts = contacts.filter(({ name }) => {
    return name.toLowerCase().includes(filterValue.toLowerCase());
  });

  return (
    <div>
      {filteredContacts.length ? (
        <List>
          {filteredContacts.map(({ id, name, number }) => (
            <ContactsItem key={id} id={id} name={name} number={number} />
          ))}
        </List>
      ) : (
        <Text>Nothing to show</Text>
      )}
    </div>
  );
};
