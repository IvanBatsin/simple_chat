import React from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketProviderProps {
  children: React.ReactNode,
  id: string
}

interface SocketContextProps {
  socket: Socket
}

const SocketContext = React.createContext<Partial<SocketContextProps>>({});

export const useSocket = () => {
  return React.useContext(SocketContext);
}

export const SokcetProvider: React.FC<SocketProviderProps> = ({children, id}: SocketProviderProps) => {
  const [socket, setSocket] = React.useState<Socket | undefined>(undefined);

  React.useEffect(() => {
    const newSocket = io('http://localhost:5000', {query: {id}});
    setSocket(newSocket);

    return () =>{ newSocket.close();}
  }, [id]);

  return (
    <SocketContext.Provider value={{socket}}>
      {children}
    </SocketContext.Provider>
  )
}