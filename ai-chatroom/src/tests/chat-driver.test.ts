import { describe, expect, beforeEach, afterEach, it, vi } from "vitest";
import { ChatDriver } from "../chat-driver";

describe("Chat Driver", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("builds a chat message object", () => {
    const chatMessage = ChatDriver.buildChatMessage(
      "chatroom1",
      "Hello",
      "user1"
    );
    expect(chatMessage).toBeDefined();
    expect(chatMessage.id).toBeDefined();
    expect(chatMessage.chatroomId).toBe("chatroom1");
    expect(chatMessage.message).toBe("Hello");
    expect(chatMessage.sender).toBe("user1");
    expect(chatMessage.timestamp).toBeDefined();
  });

  it("sends a message to the chatroom", () => {
    const driver = new ChatDriver();
    const mockHandler = vi.fn();
    driver.addOnMessageHandler(mockHandler);
    const message = ChatDriver.buildChatMessage("chatroom1", "Hello", "user1");

    driver.sendMessage(message);

    expect(driver.getHistory().length).toBe(1);
    expect(driver.getHistory()[0]).toBe(message);
    expect(mockHandler).toHaveBeenCalledWith(message);
  });
});
