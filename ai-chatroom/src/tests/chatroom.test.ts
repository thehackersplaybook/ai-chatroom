import { describe, expect, beforeEach, afterEach, it, vi } from "vitest";
import { Chatroom } from "../chatroom";
import { Agent } from "../agent";
import { ChatDriver } from "../chat-driver";

describe("chatroom", () => {
  let standardAgent: Agent;
  let standardChatroomName = "AI Chatroom";

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

  describe("initialization", () => {
    it("should create a new chatroom with name id", () => {
      const chatroom = new Chatroom({ name: standardChatroomName });
      expect(chatroom.getName()).toBe(standardChatroomName);
      expect(chatroom.getId()).toBeDefined();
    });

    it("should create a new chatroom with empty description", () => {
      const chatroom = new Chatroom({ name: standardChatroomName });
      expect(chatroom.getDescription()).toBe("");
    });

    it.each(["", "  "])(
      "should reject invalid chatroom name ('%s')",
      (name) => {
        const expectedErrorMessage = "Invalid chatroom name";
        expect(() => new Chatroom({ name })).toThrowError(expectedErrorMessage);
      }
    );

    it.each(["AI Chatroom!", "AI Chatroom@", "AI Chatroom#"])(
      "should reject non-alphanumeric chatroom name ('%s')",
      (name) => {
        const expectedErrorMessage =
          "Invalid chatroom name. Chatroom name should be alphanumeric. ";
        expect(() => new Chatroom({ name })).toThrowError(expectedErrorMessage);
      }
    );
  });

  describe("agent exists", () => {
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
  });

  describe("add agent", () => {
    it("adds an agent to the chatroom", async () => {
      const chatroom = new Chatroom({ name: "AI Chatroom" });
      const agent = standardAgent;
      const processMessageSpy = vi.spyOn(agent, "processMessage");
      const agentReply = ChatDriver.buildAgentChatMessage(
        chatroom.getId(),
        "Hello, how can I help you?",
        agent.getId()
      );
      processMessageSpy.mockImplementation(async () => agentReply);
      const chatDriver = chatroom.getChatDriver();
      const addEventHandlerSpy = vi.spyOn(chatDriver, "addOnMessageHandler");
      await chatroom.addAgent(agent);
      const message = ChatDriver.buildAgentChatMessage(
        chatroom.getId(),
        "Hello",
        "random_agent_id"
      );
      expect(addEventHandlerSpy).toHaveBeenCalledTimes(1);
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

    it("added agent doesn't reply to its own message", async () => {
      const chatroom = new Chatroom({ name: "AI Chatroom" });
      const agent = standardAgent;
      const processMessageSpy = vi.spyOn(agent, "processMessage");
      processMessageSpy.mockResolvedValueOnce(null);
      const chatDriver = chatroom.getChatDriver();
      const sendMessageSpy = vi.spyOn(chatDriver, "sendMessage");
      await chatroom.addAgent(agent);
      const message = ChatDriver.buildAgentChatMessage(
        chatroom.getId(),
        "Hello",
        agent.getId()
      );
      await chatDriver.sendMessage(message);
      expect(processMessageSpy).toHaveBeenCalledTimes(0);
      expect(sendMessageSpy).toHaveBeenCalledTimes(1);
    });

    it("added agent replies to other agents' messages", async () => {
      const chatroom = new Chatroom({ name: "AI Chatroom" });
      const agent = standardAgent;
      const processMessageSpy = vi.spyOn(agent, "processMessage");
      const agentReply = ChatDriver.buildAgentChatMessage(
        chatroom.getId(),
        "Hello, this is the newly added message from the agent",
        agent.getId()
      );
      const message = ChatDriver.buildAgentChatMessage(
        chatroom.getId(),
        "Hello",
        "random_agent_id"
      );
      processMessageSpy.mockResolvedValueOnce(agentReply);
      const chatDriver = chatroom.getChatDriver();
      const sendMessageSpy = vi.spyOn(chatDriver, "sendMessage");

      await chatroom.addAgent(agent);
      await chatDriver.sendMessage(message);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      expect(processMessageSpy).toHaveBeenCalledTimes(1);
      expect(sendMessageSpy).toHaveBeenCalledTimes(2);
    });

    it("added agent doesn't reply to message if processing fails", async () => {
      const chatroom = new Chatroom({ name: "AI Chatroom" });
      const agent = standardAgent;
      const processMessageSpy = vi.spyOn(agent, "processMessage");
      processMessageSpy.mockResolvedValueOnce(null);
      const chatDriver = chatroom.getChatDriver();
      const sendMessageSpy = vi.spyOn(chatDriver, "sendMessage");
      const message = ChatDriver.buildAgentChatMessage(
        chatroom.getId(),
        "Hello",
        "random_agent_id"
      );

      await chatroom.addAgent(agent);
      await chatDriver.sendMessage(message);

      expect(processMessageSpy).toHaveBeenCalledTimes(1);
      expect(sendMessageSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("set description", () => {
    it("sets the description of the chatroom", () => {
      const chatroom = new Chatroom({ name: "AI Chatroom" });
      const description = "This is a test chatroom";
      chatroom.setDescription(description);
      expect(chatroom.getDescription()).toBe(description);
    });
  });
});
