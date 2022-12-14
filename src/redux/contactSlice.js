import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const contactsList = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const contacts = createSlice({
  name: 'contacts',
  initialState: {
    item: contactsList,
    filter: '',
  },
  reducers: {
    newContacts(state, action) {
      state.item = [...state.item, action.payload];
    },
    deleteContacts(state, action) {
      state.item = state.item.filter(contact => contact.id !== action.payload);
    },
    filterValue(state, action) {
      state.filter = action.payload;
    },
  },
});

const persistConfig = {
  key: 'contact-list',
  storage,
  whitelist: ['item'],
};

export const contactsReducer = persistReducer(persistConfig, contacts.reducer);
export const { newContacts, deleteContacts, filterValue } = contacts.actions;

export const getItem = state => state.contacts.item;
export const getFilter = state => state.contacts.filter;
