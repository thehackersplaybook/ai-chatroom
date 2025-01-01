import { describe, expect, beforeEach, afterEach, it, vi } from "vitest";
import { ChatDriver } from "../chat-driver";
import { Observable } from "rxjs";

describe("Chat Driver", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });


  it("returns an observable for chat messages", () => {
    const driver = new ChatDriver();
    const messagesObservable = driver.getMessagesObservable();
    expect(messagesObservable).toBeDefined();
    expect(messagesObservable.subscribe).toBeDefined();
    expect(messagesObservable).toBeInstanceOf(Observable);
  });

  it("builds a chat message object", () => {
    const driver = new ChatDriver();
    const chatMessage = driver.buildChatMessage("chatroom1", "Hello", "user1");
    expect(chatMessage).toBeDefined();
    expect(chatMessage.id).toBeDefined();
    expect(chatMessage.chatroomId).toBe("chatroom1");
    expect(chatMessage.message).toBe("Hello");
    expect(chatMessage.sender).toBe("user1");
    expect(chatMessage.timestamp).toBeDefined();
  });

});