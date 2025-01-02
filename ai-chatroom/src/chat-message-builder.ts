/**
 *
 * @file chat-message-builder.ts
 * @author Aditya Patange (AdiPat) <contact.adityapatange@gmail.com>
 * @description Builds chat messages of different specifications.
 * @date December 2024
 * @version 1.0.0
 * @license Affero General Public License v3.0
 * ✨ "We're the pioneers of creation, destruction, and maintainance of software." — H1ckxrBVM808
 *
 */

import { ChatMessage } from "./models";
import { v4 as uuid } from "uuid";

export class ChatMessageBuilder {
  private chatMessage: ChatMessage = {
    id: "",
    chatroomId: "",
    sender: "",
    message: "",
    timestamp: 0,
    isVisible: false,
    type: "na",
  };
  private visbilityExplicitlySet: boolean = false;

  private constructor() {}

  public static build(): ChatMessageBuilder {
    return new ChatMessageBuilder();
  }

  withId(id: string): ChatMessageBuilder {
    this.chatMessage.id = id;
    return this;
  }

  withChatroomId(chatroomId: string): ChatMessageBuilder {
    this.chatMessage.chatroomId = chatroomId;
    return this;
  }

  withSender(sender: string): ChatMessageBuilder {
    this.chatMessage.sender = sender;
    return this;
  }

  withMessage(message: string): ChatMessageBuilder {
    this.chatMessage.message = message;
    return this;
  }

  withTimestamp(timestamp: number): ChatMessageBuilder {
    this.chatMessage.timestamp = timestamp;
    return this;
  }

  withIsVisible(isVisible: boolean): ChatMessageBuilder {
    this.visbilityExplicitlySet = true;
    this.chatMessage.isVisible = isVisible;
    return this;
  }

  withType(type: "system" | "agent" | "user"): ChatMessageBuilder {
    this.chatMessage.type = type;
    return this;
  }

  buildChatMessage(): ChatMessage {
    if (!this.chatMessage.id) {
      this.withId(uuid());
    }

    if (!this.chatMessage.timestamp) {
      this.withTimestamp(new Date().getTime());
    }

    if (!this.chatMessage.chatroomId) {
      throw new Error("Chatroom ID is required. Call withChatroomId() method.");
    }

    if (!this.chatMessage.sender) {
      throw new Error("Sender ID is required. Call withSender() method.");
    }

    if (!this.chatMessage.message) {
      throw new Error("Message is required. Call withMessage() method.");
    }

    if (this.chatMessage.type === "na") {
      throw new Error("Type is required. Call withType() method.");
    }

    if (!this.visbilityExplicitlySet) {
      console.warn("Visibility not explicitly set. Setting to true.");
      this.withIsVisible(true);
    }

    return this.chatMessage;
  }

  agentChatMessage(): ChatMessage {
    this.withIsVisible(true);
    this.withType("agent");
    return this.buildChatMessage();
  }

  systemChatMessage(): ChatMessage {
    this.withType("system");
    return this.buildChatMessage();
  }

  userChatMessage(): ChatMessage {
    this.withIsVisible(true);
    this.withType("user");
    return this.buildChatMessage();
  }

  public static buildAgentChatMessage(
    chatroomId: string,
    message: string,
    sender: string
  ): ChatMessage {
    return new ChatMessageBuilder()
      .withId(uuid())
      .withSender(sender)
      .withChatroomId(chatroomId)
      .withMessage(message)
      .agentChatMessage();
  }

  public static buildSystemChatMessage(
    chatroomId: string,
    message: string,
    sender: string
  ): ChatMessage {
    return new ChatMessageBuilder()
      .withId(uuid())
      .withSender(sender)
      .withChatroomId(chatroomId)
      .withMessage(message)
      .systemChatMessage();
  }

  public static buildUserChatMessage(
    chatroomId: string,
    message: string,
    sender: string
  ): ChatMessage {
    return new ChatMessageBuilder()
      .withId(uuid())
      .withSender(sender)
      .withChatroomId(chatroomId)
      .withMessage(message)
      .userChatMessage();
  }

  static buildInvisibleSystemChatMessage(
    chatroomId: string,
    message: string,
    sender: string
  ): ChatMessage {
    return new ChatMessageBuilder()
      .withId(uuid())
      .withSender(sender)
      .withChatroomId(chatroomId)
      .withMessage(message)
      .withIsVisible(false)
      .systemChatMessage();
  }
}
