import React from 'react';
import { useContacts } from '../context/ContactContext';
import { ListGroup } from 'react-bootstrap';

export const Contacts: React.FC = () => {
  const {contacts} = useContacts();
  return (
    <ListGroup variant='flush'>
      {contacts!.map(contact => {
        return <ListGroup.Item key={contact.id}>{contact.name}</ListGroup.Item>
      })}
    </ListGroup>
  )
}