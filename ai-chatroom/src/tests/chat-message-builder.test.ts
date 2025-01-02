import { ChatMessageBuilder } from "../chat-message-builder";
import { ChatMessage } from "../models";
import { describe, expect, beforeEach, afterEach, it, vi } from "vitest";

describe("chat message builder", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should build a chat message with all properties set", () => {
    const chatMessage: ChatMessage = ChatMessageBuilder.build()
      .withId("123")
      .withChatroomId("chatroom1")
      .withSender("user1")
      .withMessage("Hello, world!")
      .withTimestamp(1620000000000)
      .withIsVisible(true)
      .withType("user")
      .buildChatMessage();

    expect(chatMessage.id).toBe("123");
    expect(chatMessage.chatroomId).toBe("chatroom1");
    expect(chatMessage.sender).toBe("user1");
    expect(chatMessage.message).toBe("Hello, world!");
    expect(chatMessage.timestamp).toBe(1620000000000);
    expect(chatMessage.isVisible).toBe(true);
    expect(chatMessage.type).toBe("user");
  });

  it("should throw an error if chatroomId is not set", () => {
    expect(() => {
      ChatMessageBuilder.build()
        .withSender("user1")
        .withMessage("Hello, world!")
        .withType("user")
        .buildChatMessage();
    }).toThrow("Chatroom ID is required. Call withChatroomId() method.");
  });

  it("should throw an error if sender is not set", () => {
    expect(() => {
      ChatMessageBuilder.build()
        .withChatroomId("chatroom1")
        .withMessage("Hello, world!")
        .withType("user")
        .buildChatMessage();
    }).toThrow("Sender ID is required. Call withSender() method.");
  });

  it("should throw an error if message is not set", () => {
    expect(() => {
      ChatMessageBuilder.build()
        .withChatroomId("chatroom1")
        .withSender("user1")
        .withType("user")
        .buildChatMessage();
    }).toThrow("Message is required. Call withMessage() method.");
  });

  it("should throw an error if type is not set", () => {
    expect(() => {
      ChatMessageBuilder.build()
        .withChatroomId("chatroom1")
        .withSender("user1")
        .withMessage("Hello, world!")
        .buildChatMessage();
    }).toThrow("Type is required. Call withType() method.");
  });

  it("should set visibility to true if not explicitly set", () => {
    const chatMessage: ChatMessage = ChatMessageBuilder.build()
      .withChatroomId("chatroom1")
      .withSender("user1")
      .withMessage("Hello, world!")
      .withType("user")
      .buildChatMessage();

    expect(chatMessage.isVisible).toBe(true);
  });

  it("should build an agent chat message", () => {
    const chatMessage: ChatMessage = ChatMessageBuilder.buildAgentChatMessage(
      "chatroom1",
      "Hello, world!",
      "agent1"
    );

    expect(chatMessage.chatroomId).toBe("chatroom1");
    expect(chatMessage.sender).toBe("agent1");
    expect(chatMessage.message).toBe("Hello, world!");
    expect(chatMessage.type).toBe("agent");
    expect(chatMessage.isVisible).toBe(true);
  });

  it("should build a system chat message", () => {
    const chatMessage: ChatMessage = ChatMessageBuilder.buildSystemChatMessage(
      "chatroom1",
      "System message",
      "system1"
    );

    expect(chatMessage.chatroomId).toBe("chatroom1");
    expect(chatMessage.sender).toBe("system1");
    expect(chatMessage.message).toBe("System message");
    expect(chatMessage.type).toBe("system");
  });

  it("should build a user chat message", () => {
    const chatMessage: ChatMessage = ChatMessageBuilder.buildUserChatMessage(
      "chatroom1",
      "User message",
      "user1"
    );

    expect(chatMessage.chatroomId).toBe("chatroom1");
    expect(chatMessage.sender).toBe("user1");
    expect(chatMessage.message).toBe("User message");
    expect(chatMessage.type).toBe("user");
    expect(chatMessage.isVisible).toBe(true);
  });

  it("should build an invisible system chat message", () => {
    const chatMessage: ChatMessage =
      ChatMessageBuilder.buildInvisibleSystemChatMessage(
        "chatroom1",
        "Invisible system message",
        "system1"
      );

    expect(chatMessage.chatroomId).toBe("chatroom1");
    expect(chatMessage.sender).toBe("system1");
    expect(chatMessage.message).toBe("Invisible system message");
    expect(chatMessage.type).toBe("system");
    expect(chatMessage.isVisible).toBe(false);
  });
});
