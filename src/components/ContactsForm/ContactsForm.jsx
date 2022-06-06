import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { useState } from 'react';
import 'react-phone-input-2/lib/style.css';

import {
  FormBody,
  Title,
  Input,
  Button,
  Error,
  PhoneField,
} from './ContactsForm.styled';

const schema = yup.object().shape({
  name: yup
    .string()
    .min(2)
    .max(32)
    .required('Please enter the name of your contact'),
});

export const ContactsForm = ({ contacts, onAddContact }) => {
  const [phone, setPhone] = useState('');

  const checkDuplicateName = nameToAdd => {
    return contacts.find(
      ({ name }) => name.toLowerCase() === nameToAdd.toLowerCase(),
    );
  };

  const handleSubmit = ({ name }, { resetForm }) => {
    if (checkDuplicateName(name)) {
      toast.warn(
        'You are trying to enter a name that is already on the phonebook',
      );
      resetForm();
      setPhone('');
      return;
    }

    if (!phone) {
      toast.warn('Please enter the phone number of your contact');
      return;
    }

    onAddContact(name, phone);
    resetForm();
    setPhone('');
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
            autoFocus={true}
            type="text"
            name="name"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          />
          <ErrorMessage name="name" component={Error} />
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

ContactsForm.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
  onAddContact: PropTypes.func.isRequired,
};
