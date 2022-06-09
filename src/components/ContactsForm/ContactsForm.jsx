import { useState } from 'react';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';
import 'react-phone-input-2/lib/style.css';

import {
  FormBody,
  Title,
  Input,
  Button,
  Error,
  PhoneField,
} from './ContactsForm.styled';
import { useDispatch, useSelector } from 'react-redux';
import { createContact, getContactsValue } from '../../redux/contactsSlice';

const schema = yup.object().shape({
  name: yup
    .string()
    .min(2)
    .max(32)
    .required('Please enter the name of your contact'),
});

export const ContactsForm = () => {
  const [phone, setPhone] = useState('');

  const contacts = useSelector(getContactsValue);
  const dispatch = useDispatch();

  const checkDuplicateName = nameToAdd => {
    return contacts.find(
      ({ name }) => name.toLowerCase() === nameToAdd.toLowerCase()
    );
  };

  const handleSubmit = ({ name }, { resetForm }) => {
    if (checkDuplicateName(name)) {
      toast.warn(
        'You are trying to enter a name that is already on the phonebook'
      );
      return;
    }

    if (!phone) {
      toast.warn('Please enter the phone number of your contact');
      return;
    }

    addContact(name, phone);
    resetForm();
    setPhone('');
  };

  const addContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    dispatch(createContact(contact));
  };

  return (
    <>
      <Formik
        initialValues={{
          name: '',
        }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <FormBody>
          <Title>Name</Title>
          <Input
            autoFocus={false}
            placeholder={'Enter the name of your contact'}
            type="text"
            name="name"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          />
          <ErrorMessage name="name" component={Error} />
          <Title>Phone</Title>
          <PhoneField
            country={'ua'}
            placeholder={'+380 (63) 000 00 00'}
            autoFocus={false}
            value={phone}
            onChange={setPhone}
            required={'required'}
          />
          <Button type="submit">Add contact</Button>
        </FormBody>
      </Formik>
    </>
  );
};
