import React from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useConversations } from '../context/ConversationsContext';

export const OpenConversation: React.FC = () => {
  const [text, setText] = React.useState<string>('');
  const setRef = React.useCallback((node: HTMLDivElement) => {
    if (node) {
      node.scrollIntoView();
    }
  }, []);
  const { selectedConversation, sendMessage } = useConversations();

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    sendMessage!(selectedConversation?.recipients.map(recipient => recipient.id)!, text);
    setText('');
  }
  
  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto">
        <div className="d-flex flex-column align-items-start justify-content-end px-3">
          {selectedConversation?.messages.map((message, index) => {
            const lastMessage = selectedConversation.messages.length - 1 === index;
            return (
              <div 
                key={index} 
                className={`my-1 d-flex flex-column ${message.fromMe ? 'align-self-end align-items-end' : 'align-items-start'}`}
                ref={lastMessage ? setRef : null}>
                <div 
                  className={`rounded px-2 py-1 ${message.fromMe ? 'bg-primary text-white' : 'border'}`}>
                  {message.text}
                </div>
                <div className={`text-muted small ${message.fromMe ? 'text-right' : ''}`}>
                  {message.fromMe ? 'You' : message.sender}
                </div>
              </div>
            )
          })}
        </div>
      </div>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className="m-2">
            <InputGroup>
              <Form.Control 
                style={{height:75, resize:'none'}}
                as="textarea" 
                required 
                value={text} 
                onChange={event => setText(event.target.value)}/>
            </InputGroup>
            <InputGroup.Append>
              <Button type="submit">Send</Button>
            </InputGroup.Append>
          </Form.Group>
        </Form>
    </div>
  )
}