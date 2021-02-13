import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
const server = createServer();

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000'
  }
});

function queryToString(value: string | string[] | undefined): string {
  if (!value) {
    return '';
  }

  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

io.on('connection', (socket: Socket) => {
  // socket id формируется каждый раз
  const id = queryToString(socket.handshake.query.id); // создаем статический id
  socket.join(id);

  socket.on('send-message', (msg: {recipients: string[], text: string}) => {
    msg.recipients.map(recipient => {
      const newRecipients = msg.recipients.filter(item => item !== recipient);
      newRecipients.push(id);
      socket.broadcast.emit('recieve-message', {
        recipients: newRecipients,
        sender: id,
        text: msg.text
      });
    });
  });
});

server.listen(5000, () => console.log('we on air'));