/**
 * Filename: chat-driver.ts
 * Author: Aditya Patange (AdiPat)
 * Description: Driver for chat messages in the AI Chatroom tool.
 * ✨ "We don't ask, we enquire." – Anonymous
 */
import { Observable } from "rxjs";
import { ChatMessage } from "./models";
/**
 * ChatDriver class provides methods to orchestrate the chat messages in the chatroom.
 */
export declare class ChatDriver {
    private messages;
    private history;
    /**
     * Returns the observable for chat messages
     * @returns Observable<ChatMessage> - The observable for chat messages
     */
    getMessagesObservable(): Observable<ChatMessage>;
    /**
     * Sends a message to the chatroom
     * @param message - The message to send
     */
    sendMessage(message: ChatMessage): void;
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
    buildChatMessage(chatroomId: string, message: string, sender: string): ChatMessage;
}
