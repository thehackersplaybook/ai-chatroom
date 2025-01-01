
export interface ChatMessage {
  id: string;
  chatroomId: string;
  sender: string;
  message: string;
  timestamp: number; // Unix timestamp
}