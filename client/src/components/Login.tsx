import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { v4 } from 'uuid';

interface LoginProps {
  onSubmit: (value: string) => void
}

export const Login: React.FC<LoginProps> = ({onSubmit}: LoginProps) => {
  const idRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onSubmit(idRef.current!.value);
  }

  const createNewId = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    onSubmit(v4());
  }
  
  return (
    <Container className="align-items-center d-flex" style={{height:'100vh'}}>
      <Form className="w-100" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Enter your ID</Form.Label>
          <Form.Control type="text" ref={idRef} required/>
        </Form.Group>
        <Button type="submit" className="mr-2">Login</Button>
        <Button type="submit" variant="secondary" onClick={createNewId}>Create new ID</Button>
      </Form>
    </Container>
  );
}