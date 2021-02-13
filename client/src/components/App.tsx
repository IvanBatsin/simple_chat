import React from 'react';
import { ContactsProvider } from '../context/ContactContext';
import { ConversationsProvider } from '../context/ConversationsContext';
import { SokcetProvider } from '../context/SocketContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Dashboard } from './Dashboard';
import { Login } from './Login';

export const App: React.FC = () => {
  const [id, setId] = useLocalStorage<string>('id', '');

  const dashboard = (
    <SokcetProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <Dashboard id={id}/>
        </ConversationsProvider>
      </ContactsProvider>
    </SokcetProvider>
  )

  return (
    id ? dashboard : <Login onSubmit={setId}/>
  );
}