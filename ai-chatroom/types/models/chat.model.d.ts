export type ChatMessageType = "system" | "agent" | "user";
export interface ChatMessage {
    id: string;
    chatroomId: string;
    sender: string;
    message: string;
    timestamp: number;
    isVisible: boolean;
    type: ChatMessageType;
}
