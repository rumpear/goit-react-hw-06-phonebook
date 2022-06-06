import { createSlice } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    filter: '',
  },
  reducers: {
    addContact(state, action) {
      // console.log('action.payload', action.payload);
      state.items.push(action.payload);
    },
    removeContact(state, action) {
      return state.items.filter(item => item.id !== action.payload);
    },
    setFilter(state, action) {
      // console.log(action.payload);
      state.filter = action.payload;
    },
  },
});

export const { addContact, removeContact, setFilter } = contactsSlice.actions;
// export const { addContact, removeContact } = contactsSlice.actions;

export default contactsSlice.reducer;
