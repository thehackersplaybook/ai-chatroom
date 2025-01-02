import { describe, expect, beforeEach, afterEach, it, vi } from "vitest";
import { ChatDriver } from "../chat-driver";
import { ChatMessage } from "../models";

describe("Chat Driver", () => {
  let standardChatMessage: ChatMessage;

  beforeEach(() => {
    standardChatMessage = ChatDriver.buildAgentChatMessage(
      "chatroom1",
      "Hello",
      "user1"
    );
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("build chat message", () => {
    it("builds an agent chat message object", () => {
      const expectedChatMessage = {
        id: expect.any(String),
        chatroomId: "chatroom1",
        sender: "user1",
        message: "Hello",
        timestamp: new Date().getTime(),
        isVisible: true,
        type: "agent",
      };
      const chatMessage = ChatDriver.buildAgentChatMessage(
        "chatroom1",
        "Hello",
        "user1"
      );
      expect(chatMessage).toEqual(expectedChatMessage);
    });

    it("builds a system chat message object", () => {
      const expectedChatMessage = {
        id: expect.any(String),
        chatroomId: "chatroom1",
        sender: "user1",
        message: "Hello",
        timestamp: new Date().getTime(),
        isVisible: true,
        type: "system",
      };
      const chatMessage = ChatDriver.buildSystemChatMessage(
        "chatroom1",
        "Hello",
        "user1"
      );
      expect(chatMessage).toEqual(expectedChatMessage);
    });

    it("builds a user chat message object", () => {
      const expectedChatMessage = {
        id: expect.any(String),
        chatroomId: "chatroom1",
        sender: "user1",
        message: "Hello",
        timestamp: new Date().getTime(),
        isVisible: true,
        type: "user",
      };
      const chatMessage = ChatDriver.buildUserChatMessage(
        "chatroom1",
        "Hello",
        "user1"
      );
      expect(chatMessage).toEqual(expectedChatMessage);
    });
  });

  describe("send message", () => {
    it("sends a message to the chatroom", async () => {
      const driver = new ChatDriver();
      const mockHandler = vi.fn();
      driver.addOnMessageHandler(mockHandler);

      await driver.sendMessage(standardChatMessage);

      const expectedHistory = driver.getHistory();

      expect(expectedHistory.length).toBe(1);
      expect(expectedHistory[0]).toBe(standardChatMessage);
      expect(mockHandler).toHaveBeenCalledWith(standardChatMessage);
    });
  });

  describe("get history", () => {
    it("returns empty chat history when no messages are sent", () => {
      const driver = new ChatDriver();
      const expectedHistory = driver.getHistory();
      expect(expectedHistory.length).toBe(0);
    });

    it("returns chat history when multiple messages are sent", async () => {
      const message2 = ChatDriver.buildAgentChatMessage(
        "chatroom1",
        "Hello",
        "user2"
      );
      const driver = new ChatDriver();
      await driver.sendMessage(standardChatMessage);
      await driver.sendMessage(message2);
      const expectedHistory = driver.getHistory();
      expect(expectedHistory).toEqual([standardChatMessage, message2]);
    });
  });

  describe("terminate chat", () => {
    it("doesn't allow send message after chat is terminated", async () => {
      const driver = new ChatDriver();
      const mockHandler = vi.fn();
      driver.addOnMessageHandler(mockHandler);

      await driver.sendMessage(standardChatMessage);
      driver.terminateChat();

      const failingMessage = ChatDriver.buildAgentChatMessage(
        "chatroom1",
        "Hello",
        "user1"
      );
      const sendPromise = driver.sendMessage(failingMessage);
      await expect(sendPromise).rejects.toThrowError(
        "Chat has been terminated"
      );
    });

    it("doesn't allow adding message handler after chat is terminated", async () => {
      const driver = new ChatDriver();
      const mockHandler = vi.fn();
      driver.terminateChat();

      const addHandler = () => driver.addOnMessageHandler(mockHandler);
      expect(addHandler).toThrowError("Chat has been terminated");
    });

    it("maintains idempotency when terminating chat multiple times", () => {
      const driver = new ChatDriver();
      driver.terminateChat();
      expect(() => driver.terminateChat()).not.toThrow();
    });
  });
});
