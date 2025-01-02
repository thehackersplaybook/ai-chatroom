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
import { ChatMessage, ChatMessageType } from "./models";
import { v4 as uuid } from "uuid";

/**
 * ChatDriver class provides orchestration for chat messages.
 */
export class ChatDriver {
  private messages: Subject<ChatMessage> = new Subject();
  private history: ChatMessage[] = [];
  private isChatTerminated: boolean = false;
  private chatTerminatedErrorMesssage: string = "Chat has been terminated";

  /**
   * Sends a message to the chatroom
   * @param message - The message to send
   */
  public async sendMessage(message: ChatMessage): Promise<void> {
    if (this.isChatTerminated) {
      throw new Error(this.chatTerminatedErrorMesssage);
    }

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
  private static buildChatMessage(
    chatroomId: string,
    message: string,
    sender: string,
    isVisible: boolean,
    type: ChatMessageType
  ): ChatMessage {
    return {
      id: uuid(),
      chatroomId,
      sender,
      message,
      timestamp: new Date().getTime(),
      isVisible,
      type,
    };
  }

  /**
   * Builds an agent chat message object
   * @param chatroomId The ID of the chatroom
   * @param message The message content of the chat message
   * @param sender The sender ID of the chat message
   * @returns The chat message object
   */
  public static buildAgentChatMessage(
    chatroomId: string,
    message: string,
    sender: string
  ): ChatMessage {
    return this.buildChatMessage(chatroomId, message, sender, true, "agent");
  }

  /**
   * Builds a system chat message object
   * @param chatroomId The ID of the chatroom
   * @param message The message content of the chat message
   * @param sender The sender ID of the chat message
   * @returns The chat message object
   */
  public static buildSystemChatMessage(
    chatroomId: string,
    message: string,
    sender: string
  ): ChatMessage {
    return this.buildChatMessage(chatroomId, message, sender, true, "system");
  }

  /**
   * Builds a user chat message object
   * @param chatroomId The ID of the chatroom
   * @param message The message content of the chat message
   * @param sender The sender ID of the chat message
   * @returns The chat message object
   */
  public static buildUserChatMessage(
    chatroomId: string,
    message: string,
    sender: string
  ): ChatMessage {
    return this.buildChatMessage(chatroomId, message, sender, true, "user");
  }

  /**
   * Attaches a handler function to be called when a message is received
   * @param handler Handler function to be called when a message is received
   */
  public addOnMessageHandler(
    handler: (message: ChatMessage) => Promise<void>
  ): void {
    if (this.isChatTerminated) {
      throw new Error(this.chatTerminatedErrorMesssage);
    }

    this.messages.subscribe(handler);
  }

  public terminateChat(): void {
    this.isChatTerminated = true;
    this.messages.complete();
  }
}
