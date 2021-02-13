import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { IContact, IConversation, IConversationFull, IMessage } from '../interfaces';
import { useContacts } from './ContactContext';
import { useSocket } from './SocketContext';

type ContextProps = {
  createConversation: (recipients: string[]) => void,
  conversations: IConversationFull[],
  selectConversationIndex: (index: number) => void,
  selectedConversation: IConversationFull,
  sendMessage: (recipients: string[], text: string) => void
}

const ConversationsContext = React.createContext<Partial<ContextProps>>({});

interface ConversationsProviderProps {
  children: React.ReactNode,
  id: string
}

export const ConversationsProvider: React.FC<ConversationsProviderProps> = ({children, id}: ConversationsProviderProps) => {
  const [conversations, setConversations] = useLocalStorage<IConversation[]>('conversations', []);
  const [selectedConversationIndex, setSelectedConversationIndex] = React.useState<number>(0);
  const { contacts } = useContacts();
  const { socket } = useSocket();

  const createConversation = (recipients: string[]): void => {
    setConversations(prevState => [...prevState, {recipients, messages: []}]);
  }

  const formattedConversations: IConversationFull[] = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map(recipient => {
      const contact = contacts?.find(contact => contact.id === recipient);
      const name = (contact && contact?.name) || recipient;
      return {id: recipient, name};
    });

    const messages = conversation.messages.map(message => {
      const contact = contacts?.find(contact => contact.id === message.sender);
      const sender = (contact && contact.name) || message.sender;
      const fromMe = message.sender === id;
      return {...message, sender, fromMe};
    });
    const selected = selectedConversationIndex === index;
    return {...conversation, recipients, selected, messages};
  });

  const addMessageToConversation = React.useCallback((obj: {recipients: string[], text: string, sender: string}): void => {
    setConversations(prevState => {
      let madeChange = false;
      const newMessage: IMessage = { sender: obj.sender, text: obj.text, fromMe: id === obj.sender };
      const newConversations = prevState.map(conversation => {
        if (arrayEquality(conversation.recipients, obj.recipients)) {
          madeChange = true;
          return {...conversation, messages: [...conversation.messages, newMessage]};
        }

        return conversation;
      });

      if (madeChange) {
        return newConversations;
      } else {
        return [...prevState, {recipients: obj.recipients, messages: [newMessage]}];
      }
    });
  }, [setConversations])

  const sendMessage = (recipients: string[], text: string): void => {
    socket?.emit('send-message', {recipients, text});
    addMessageToConversation({recipients, text, sender: id});
  }

  const value = {
    selectConversationIndex: setSelectedConversationIndex,
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectedConversationIndex],
    createConversation,
    sendMessage
  }

  React.useEffect(() => {
    if (!socket) return;
    
    socket?.on('recieve-message', addMessageToConversation);

    return () => {
      socket.off('recieve-message');
    }
  }, [socket, addMessageToConversation]);

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  )
}

export const useConversations = () => {
  return React.useContext(ConversationsContext);
}

function arrayEquality(a: any[], b: any[]): boolean {
  if (a.length !== b.length) {
    return false;
  }

  a.sort();
  b.sort();

  return a.every((elem, index) => elem === b[index]);
}