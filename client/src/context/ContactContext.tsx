import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { IContact } from '../interfaces';

type ContextProps = {
  contacts: IContact[],
  createContact: (id: string, name: string) => void
}

const ContactsContext = React.createContext<Partial<ContextProps>>({});

export const ContactsProvider: React.FC = ({children}) => {
  const [contacts, setContacts] = useLocalStorage<IContact[]>('contacts', []);

  const createContact = (id: string, name: string): void => {
    setContacts(prevState => [...prevState, {id, name}]);
    console.log(contacts);
  }

  return (
    <ContactsContext.Provider value={{
      contacts,
      createContact
    }}>
      {children}
    </ContactsContext.Provider>
  )
}

export const useContacts = () => {
  return React.useContext(ContactsContext);
}