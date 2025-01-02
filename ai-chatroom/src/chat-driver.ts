/**
 *
 * @file chat-driver.ts
 * @author Aditya Patange (AdiPat) <contact.adityapatange@gmail.com>
 * @description 🚀 ChatDriver The low-level module to handle all chat activities.
 * @date December 2024
 * @version 1.0.0
 * @license Affero General Public License v3.0
 * ✨ "We win because we choose." — Anonymous
 *
 */
import { Subject } from "rxjs";
import { ChatMessage } from "./models";
import { v4 as uuid } from "uuid";

/**
 * ChatDriver class provides orchestration for chat messages.
 */
export class ChatDriver {
  private messages: Subject<ChatMessage> = new Subject();
  private history: ChatMessage[] = [];

  /**
   * Sends a message to the chatroom
   * @param message - The message to send
   */
  public sendMessage(message: ChatMessage): void {
    this.messages.next(message);
    this.history.push(message);
  }

  /**
   * Returns the chat history
   * @returns ChatMessage[] - The chat history
   */
  public getHistory(): ChatMessage[] {
    return this.history;
  }

  /**
   * Builds a chat message object
   * @param chatroomId The ID of the chatroom
   * @param message Message content of the chat message
   * @param sender The sender ID of the chat message
   * @returns ChatMessage The chat message object
   */
  public static buildChatMessage(
    chatroomId: string,
    message: string,
    sender: string
  ): ChatMessage {
    return {
      id: uuid(),
      chatroomId,
      sender,
      message,
      timestamp: new Date().getTime(),
    };
  }

  /**
   * Attaches a handler function to be called when a message is received
   * @param handler Handler function to be called when a message is received
   */
  public addOnMessageHandler(
    handler: (message: ChatMessage) => Promise<void>
  ): void {
    this.messages.subscribe(handler);
  }
}
