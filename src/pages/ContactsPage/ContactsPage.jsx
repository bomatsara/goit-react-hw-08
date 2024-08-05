import css from './ContactsPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from '../../redux/contacts/operations.js';
import { useEffect } from 'react';
import ContactForm from '../../components/ContactForm/ContactForm.jsx';
import SearchBox from '../../components/SearchBox/SearchBox.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import ContactList from '../../components/ContactList/ContactList.jsx';
import Error from '../../components/Error/Error';
import { selectContactsError, selectContactsLoading } from '../../redux/contacts/selectors.js';

export default function ContactsPage() {
  const dispatch = useDispatch();
  const loading = useSelector(selectContactsLoading);
  const isError = useSelector(selectContactsError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <h1 style={{
        fontSize: 40,
        marginBottom: 30,
      }}>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      {loading && <Loader />}
      {isError && <Error />}
      {!loading && !isError && <ContactList />}
    </>
  );
};