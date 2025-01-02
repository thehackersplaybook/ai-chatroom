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

  /**
   * Terminates the chat and completes the message stream
   * @returns void
   */
  public terminateChat(): void {
    this.isChatTerminated = true;
    this.messages.complete();
  }
}
