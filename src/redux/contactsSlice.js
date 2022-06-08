import { createSlice } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    filter: '',
  },
  reducers: {
    addContact(state, action) {
      return { ...state, items: [...state.items, action.payload] };
    },
    removeContact(state, action) {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    },
    updateFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

export const { addContact, removeContact, updateFilter } =
  contactsSlice.actions;
export default contactsSlice.reducer;
