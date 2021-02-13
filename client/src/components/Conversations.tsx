import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useConversations } from '../context/ConversationsContext';

export const Conversations: React.FC = () => {
  const { conversations, selectConversationIndex } = useConversations();
  return (
    <ListGroup variant='flush'>
      {conversations!.map((conversation, index) => {
        return <ListGroup.Item 
                  key={index} 
                  action 
                  active={conversation.selected}
                  onClick={() => selectConversationIndex!(index)}>
                    {conversation.recipients.map(recipient => recipient.name).join(', ')}
                </ListGroup.Item>
      })}
    </ListGroup>
  )
}