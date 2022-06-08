import { List, Text } from './ContactsList.styled';
import { useSelector } from 'react-redux';
import { ContactsItem } from './ContactsItem';

export const ContactsList = () => {
  const { items, filter } = useSelector(state => state.contacts);
  // const dispatch = useDispatch();

  const filteredContacts = items.filter(({ name }) => {
    console.log(name.toLowerCase().includes(filter.toLowerCase()));
    console.log(name, 'name');
    console.log('filter', filter);
    return name.toLowerCase().includes(filter.toLowerCase());
  });

  // const handleDeleteContact = currentId => {
  //   dispatch(removeContact(currentId));
  // };

  const filterContact = () => {
    const normalizeFilterValue = filter.toLowerCase();
    return items.filter(({ name }) =>
      name.toLowerCase().includes(normalizeFilterValue)
    );
  };

  // console.log(filterContact(), 'filterContact()');
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
