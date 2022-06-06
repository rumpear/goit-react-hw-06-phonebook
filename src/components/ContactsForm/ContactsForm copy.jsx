import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import { FormBody, Title, Input, Button, Error } from './ContactsForm.styled';
import { useState } from 'react';

const INITIAL_VALUES = {
  name: '',
  number: '',
};

const phoneRegex =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

const schema = yup.object().shape({
  name: yup
    .string()
    .min(2)
    .max(32)
    .required('Please enter the name of your contact'),
});

export const ContactsForm = ({ contacts, onAddContact }) => {
  const [phone, setPhone] = useState(0);

  const checkDuplicateName = values => {
    return contacts.find(
      ({ name }) => name.toLowerCase() === values.name.toLowerCase(),
    );
  };

  const handleSubmit = (values, { resetForm }) => {
    if (checkDuplicateName(values)) {
      toast.warn(
        'You are trying to enter a name that is already on the phonebook',
      );
      resetForm();
      return;
    }

    onAddContact(values);
    resetForm();
  };

  return (
    <>
      <Formik
        initialValues={INITIAL_VALUES}
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
          <PhoneInput
            country={'ua'}
            // value={+380638582031}
            // onChange={phone => this.setState({ phone })}
            value={phone}
            onChange={() => setPhone(phone)}
            // {console.log(phone)}
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
