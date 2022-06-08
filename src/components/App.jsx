import { nanoid } from 'nanoid';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import { useState } from 'react';
// import { useLocalStorage } from '../hooks/';

import { Section } from './Section';
import { ContactsFilter } from './ContactsFilter';
import { ContactsForm } from './ContactsForm';
import { ContactsList } from './ContactsList';

import { Wrapper, TitlePhonebook, TitleContacts } from './App.styled';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, removeContact } from '../redux/contactsSlice';

export const App = () => {
  // const value = useSelector(state => state.contacts);
  const { items, filter } = useSelector(state => state.contacts);

  // console.log(items);
  // console.log(filter);

  const dispatch = useDispatch();

  // const [contacts, setContacts] = useLocalStorage('contacts', [
  //   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  // ]);
  // const [filter, setFilter] = useState('');

  const handleAddContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    // setContacts(s => [...s, contact]);
    dispatch(addContact(contact));
    console.log(items, 'dispatch');
  };

  // const handleSearchContact = e => {
  //   // setFilter(e.currentTarget.value);
  //   // console.log(e.currentTarget.value);
  //   dispatch(setFilter(e.currentTarget.value));
  // };

  // const cont = filterContact();
  // console.log(cont, 'cont');
  // console.log(filterContact().length, 'filterContact');
  return (
    <Section>
      <Wrapper>
        <TitlePhonebook>Phonebook</TitlePhonebook>
        <ContactsForm onAddContact={handleAddContact} contacts={items} />
        <ContactsFilter />
        {/* <ContactsFilter value={filter} onSearchContact={handleSearchContact} /> */}
        <TitleContacts>Contacts</TitleContacts>
        <ContactsList />
        {/* {items.length && cont.length ? (
          <ContactsList
            contacts={filterContact()}
            onDeleteContact={handleDeleteContact}
          />
        ) : (
          <p>Nothing to show</p>
        )} */}
      </Wrapper>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Section>
  );
};
