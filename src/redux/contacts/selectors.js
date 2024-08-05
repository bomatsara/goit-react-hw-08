import { createSelector } from '@reduxjs/toolkit';
import { selectNameFilter } from '../filter/selectors.js';

export const selectContacts = state => state.contacts.items;
export const selectContactsLoading = state => state.contacts.loading;
export const selectContactsError = state => state.contacts.error;
export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, filter) => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  },
);