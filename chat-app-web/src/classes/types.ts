export interface Message {
  id: string | number,
  author: Author,
  messageContent: MessageContent
}

export interface Author {
  id: string,
  name: string,
}

export interface MessageContent {
  text: string,
  timestamp: string,
}