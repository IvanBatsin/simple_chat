export interface IContact {
  id: string,
  name: string
}

export interface IMessage {
  text: string,
  sender: string,
  fromMe: boolean
}

export interface IConversation {
  recipients: string[],
  messages: IMessage[]
}

export interface IConversationFull {
  messages: IMessage[],
  recipients: IContact[],
  selected: boolean
}