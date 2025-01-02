import { describe, expect, beforeEach, afterEach, it, vi } from "vitest";
import { ChatDriver } from "../chat-driver";
import { ChatMessage } from "../models";

describe("Chat Driver", () => {
  let standardChatMessage: ChatMessage;

  beforeEach(() => {
    standardChatMessage = ChatDriver.buildChatMessage(
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
    it("builds a chat message object", () => {
      const expectedChatMessage = {
        id: expect.any(String),
        chatroomId: "chatroom1",
        sender: "user1",
        message: "Hello",
        timestamp: new Date().getTime(),
      };
      const chatMessage = ChatDriver.buildChatMessage(
        "chatroom1",
        "Hello",
        "user1"
      );
      expect(chatMessage).toEqual(expectedChatMessage);
    });
  });

  describe("send message", () => {
    it("sends a message to the chatroom", () => {
      const driver = new ChatDriver();
      const mockHandler = vi.fn();
      driver.addOnMessageHandler(mockHandler);

      driver.sendMessage(standardChatMessage);

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

    it("returns chat history when multiple messages are sent", () => {
      const message2 = ChatDriver.buildChatMessage(
        "chatroom1",
        "Hello",
        "user2"
      );
      const driver = new ChatDriver();
      driver.sendMessage(standardChatMessage);
      driver.sendMessage(message2);
      const expectedHistory = driver.getHistory();
      expect(expectedHistory).toEqual([standardChatMessage, message2]);
    });
  });
});
