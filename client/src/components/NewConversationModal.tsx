import React from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { useContacts } from '../context/ContactContext';
import { useConversations } from '../context/ConversationsContext';

interface NewConversationModalProps {
  closeModal: () => void
}

export const NewConversationModal: React.FC<NewConversationModalProps> = ({closeModal}: NewConversationModalProps) => {
  const { contacts } = useContacts();
  const { createConversation }  = useConversations();
  const [selectedId, setSelectedId] = React.useState<string[]>([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createConversation!(selectedId);
    closeModal();
  } 

  const handleChangeCheckbox = (id: string): void => {
    setSelectedId(prevState => {
      if (prevState.includes(id)) {
        return prevState.filter(contact => contact !== id);
      }

      return [...prevState, id];
    });
  }

  return (
    <>
      <Modal.Header closeButton>Create Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}> 
          {contacts!.map(contact => {
            return <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check 
                type="checkbox" 
                checked={selectedId.includes(contact.id)}
                label={contact.name}
                onChange={() => handleChangeCheckbox(contact.id)}/>
            </Form.Group>
          })}
          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </>
  )
}