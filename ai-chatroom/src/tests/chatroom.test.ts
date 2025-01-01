import { describe, expect, beforeEach, afterEach, it, vi } from "vitest";
import { Chatroom } from "../chatroom";
import { Agent } from "../agent";
import { ChatDriver } from "../chat-driver";

describe("Chatroom", () => {
  let standardAgent: Agent;

  beforeEach(() => {
    standardAgent = new Agent({
      name: "AI Agent",
      persona: {
        key: "sample_persona",
        name: "Mr. Sample",
        description: "This is a sample persona for testing. ",
      },
    });
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should create a new chatroom with name and id", () => {
    const chatroom = new Chatroom({ name: "AI Chatroom" });
    expect(chatroom.getName()).toBe("AI Chatroom");
    expect(chatroom.getId()).toBeDefined();
  });

  it("should reject invalid chatroom name", () => {
    const expectedErrorMessage = "Invalid chatroom name";
    expect(() => new Chatroom({ name: "" })).toThrowError(expectedErrorMessage);
    expect(() => new Chatroom({ name: "  " })).toThrowError(
      expectedErrorMessage
    );
  });

  it("should reject non-alphanumeric chatroom name", () => {
    const expectedErrorMessage =
      "Invalid chatroom name. Chatroom name should be alphanumeric. ";
    expect(() => new Chatroom({ name: "AI Chatroom!" })).toThrowError(
      expectedErrorMessage
    );
    expect(() => new Chatroom({ name: "AI Chatroom@" })).toThrowError(
      expectedErrorMessage
    );
    expect(() => new Chatroom({ name: "AI Chatroom#" })).toThrowError(
      expectedErrorMessage
    );
  });

  it("returns true if agent exists in the chatroom", () => {
    const chatroom = new Chatroom({ name: "AI Chatroom" });
    const agent = standardAgent;
    chatroom.addAgent(agent);
    expect(chatroom.agentExists(agent)).toBe(true);
  });

  it("returns false if agent does not exist in the chatroom", () => {
    const chatroom = new Chatroom({ name: "AI Chatroom" });
    const agent = standardAgent;
    expect(chatroom.agentExists(agent)).toBe(false);
  });

  it("adds an agent to the chatroom and agent processes message correctly", async () => {
    const chatroom = new Chatroom({ name: "AI Chatroom" });
    const agent = standardAgent;
    const processMessageSpy = vi.spyOn(agent, "processMessage");
    const chatDriver = chatroom.getChatDriver();
    await chatroom.addAgent(agent);
    const message = ChatDriver.buildChatMessage(
      chatroom.getId(),
      "Hello",
      "random_agent_id"
    );
    chatDriver.sendMessage(message);
    expect(processMessageSpy).toHaveBeenCalledWith(message);
  });

  it("throws an error if agent already exists in the chatroom", async () => {
    const chatroom = new Chatroom({ name: "AI Chatroom" });
    const agent = standardAgent;
    await chatroom.addAgent(agent);
    const expectedErrorMessage = "Agent already exists in the chatroom. ";
    await expect(() => chatroom.addAgent(agent)).rejects.toThrowError(
      expectedErrorMessage
    );
  });
});
