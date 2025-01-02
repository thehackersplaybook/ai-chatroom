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
     * Attaches a handler function to be called when a message is received
     * @param handler Handler function to be called when a message is received
     */
    addOnMessageHandler(handler: (message: ChatMessage) => Promise<void>): void;
    /**
     * Terminates the chat and completes the message stream
     * @returns void
     */
    terminateChat(): void;
}
