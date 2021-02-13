import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useContacts } from '../context/ContactContext';

interface NewContactModalProps {
  closeModal: () => void
}


export const NewContactModal: React.FC<NewContactModalProps> = ({closeModal}: NewContactModalProps) => {
  const idRef = React.useRef<HTMLInputElement>(null);
  const nameRef = React.useRef<HTMLInputElement>(null);
  const { createContact } = useContacts();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    createContact!(idRef.current?.value!, nameRef.current?.value!);
    closeModal();
  }
  return (
    <>
      <Modal.Header closeButton>Create new Contact</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}> 
          <Form.Group>
            <Form.Label>Id</Form.Label>
            <Form.Control type="text" ref={idRef} required/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" ref={nameRef} required/>
          </Form.Group>
          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </>
  )
}