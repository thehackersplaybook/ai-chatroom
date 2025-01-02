import { ChatMessage } from "./models";
/**
 * ChatDriver class provides orchestration for chat messages.
 */
export declare class ChatDriver {
    private messages;
    private history;
    private isChatTerminated;
    private chatTerminatedErrorMesssage;
    /**
     * Sends a message to the chatroom
     * @param message - The message to send
     */
    sendMessage(message: ChatMessage): Promise<void>;
    /**
     * Returns the chat history
     * @returns ChatMessage[] - The chat history
     */
    getHistory(): ChatMessage[];
    /**
     * Builds a chat message object
     * @param chatroomId The ID of the chatroom
     * @param message Message content of the chat message
     * @param sender The sender ID of the chat message
     * @returns ChatMessage The chat message object
     */
    static buildChatMessage(chatroomId: string, message: string, sender: string): ChatMessage;
    /**
     * Attaches a handler function to be called when a message is received
     * @param handler Handler function to be called when a message is received
     */
    addOnMessageHandler(handler: (message: ChatMessage) => Promise<void>): void;
    terminateChat(): void;
}
