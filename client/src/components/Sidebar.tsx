import React from 'react';
import { Tab, Nav, Button, Modal } from 'react-bootstrap';
import { Contacts } from './Contacts';
import { Conversations } from './Conversations';
import { NewContactModal } from './NewContactModal';
import { NewConversationModal } from './NewConversationModal';

interface SidebarPorps {
  id: string
}

const CONVERSATIONS_KEY = 'conversation';
const CONTACTS_KEY = 'contact';

export const Sidebar: React.FC<SidebarPorps> = ({id}: SidebarPorps) => {
  const [activeKey, setActiveKey] = React.useState<string>(CONVERSATIONS_KEY);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const conversationsOpen = activeKey === CONVERSATIONS_KEY;

  const handleSelect = (value: string | null) => {
    setActiveKey(value!);
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  return (
    <div style={{width: 250}} className="d-flex flex-column">
      <Tab.Container activeKey={activeKey} onSelect={handleSelect}>
        <Nav variant="tabs" className="justify-content-center">
          <Nav.Item>
            <Nav.Link eventKey={CONVERSATIONS_KEY}>Conversation</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className="border-right overflow-auto flex-grow-1">
          <Tab.Pane eventKey={CONVERSATIONS_KEY}>
            <Conversations/>
          </Tab.Pane>
          <Tab.Pane eventKey={CONTACTS_KEY}>
            <Contacts/>
          </Tab.Pane>
        </Tab.Content>
        <div className="p-2 border-top border-right small">
          Your id is <span className="text-muted">{id}</span>
        </div>
        <Button className="rounded-0" onClick={() => setModalOpen(true)}>
          New {conversationsOpen ? 'Conversation' : 'Contacts'}
        </Button>
      </Tab.Container>

      <Modal show={modalOpen} onHide={closeModal}>
        {conversationsOpen ?
          <NewConversationModal closeModal={closeModal}/>
          :
          <NewContactModal closeModal={closeModal}/>
        }
      </Modal>
    </div>
  )
}