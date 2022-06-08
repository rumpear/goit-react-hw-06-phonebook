import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  },
  reducers: {
    createContact(state, action) {
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

const persistConfig = {
  key: 'contacts',
  storage,
  whitelist: ['items'],
};

export const persistedContactsReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);

export const { createContact, removeContact, updateFilter } =
  contactsSlice.actions;

// * Selectors
export const getContactsValue = state => state.contacts.items;
export const getFilterValue = state => state.contacts.filter;
