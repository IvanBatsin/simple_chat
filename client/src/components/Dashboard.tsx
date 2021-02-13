import React from 'react';
import { useConversations } from '../context/ConversationsContext';
import { OpenConversation } from './OpenConversation';
import { Sidebar } from './Sidebar';

interface DashboardProps {
  id: string
}

export const Dashboard: React.FC<DashboardProps> = ({id}: DashboardProps) => {
  const { selectedConversation } = useConversations();
  return (
    <div className="d-flex" style={{height:'100vh'}}>
      <Sidebar id={id}/>
      {selectedConversation && <OpenConversation/>}
    </div>
  )
}