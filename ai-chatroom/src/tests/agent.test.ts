import { describe, expect, beforeEach, afterEach, it, vi } from "vitest";
import { Agent } from "../agent";
import { Persona } from "../models";
import { AI } from "../ai";

describe("Agent", () => {
  const descriptionAbove256Chars = "A".repeat(257);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should create a new agent with name and id", () => {
    const persona: Persona = {
      key: "sample_persona",
      name: "Mr. Sample",
      description: "This is a sample persona for testing. ",
    };
    const agent = new Agent({ name: "AI Agent", persona });
    expect(agent.getName()).toBe("AI Agent");
    expect(agent.getId()).toBeDefined();
  });

  it("should initialize the agent with a persona", () => {
    const persona: Persona = {
      key: "sample_persona",
      name: "Mr. Sample",
      description: "This is a sample persona for testing. ",
    };
    const agent = new Agent({ name: "AI Agent", persona });
    expect(agent.getPersona()).toBeDefined();
  });

  it.each(["Mr@John", "", " ", "#91Mr"])(
    "throws an error if agent persona name (%s) is invalid",
    (name) => {
      const persona: Persona = {
        key: "sample_persona",
        name,
        description: "This is a sample persona for testing. ",
      };
      const expectedErrorMessage = "Invalid persona name";
      expect(() => new Agent({ name: "AI Agent", persona })).toThrowError(
        expectedErrorMessage
      );
    }
  );

  it.each(["Mr. John", "Mr. John Doe", "Mr. John Doe Jr."])(
    "does not throw an error if agent persona name (%s) is valid",
    (name) => {
      const persona: Persona = {
        key: "sample_persona",
        name,
        description: "This is a sample persona for testing. ",
      };
      expect(() => new Agent({ name: "AI Agent", persona })).not.toThrow();
    }
  );

  it("throws an error if persona description is above 256 characters", (name) => {
    const errorMessage =
      "Persona description should be less than 256 characters";
    const persona: Persona = {
      key: "sample_persona",
      name: "Mr. John",
      description: descriptionAbove256Chars,
    };
    expect(() => new Agent({ name: "AI Agent", persona })).toThrowError(
      errorMessage
    );
  });

  it.each(["Ag@nt", "DrAg#Nt", "", "  "])(
    "throws an error if the agent name ('%s') is invalid",
    () => {
      const errorMessage = "Invalid agent name";
      const persona: Persona = {
        key: "sample_persona",
        name: "Mr. John",
        description: "This is a sample persona for testing. ",
      };
      expect(() => new Agent({ name: "", persona })).toThrowError(errorMessage);
    }
  );

  it("processes a chat message", async () => {
    const getInstanceSpy = vi.spyOn(AI, "getInstance");

    getInstanceSpy.mockImplementation(async (): Promise<any> => {
      return {
        generateObject: async () => {
          return {
            object: {
              message: "Hello, how can I help you?",
            },
          };
        },
      };
    });

    const persona: Persona = {
      key: "sample_persona",
      name: "Mr. Sample",
      description: "This is a sample persona for testing. ",
    };
    const agent = new Agent({ name: "AI Agent", persona });
    const chatMessage = {
      id: "1",
      chatroomId: "chatroom1",
      sender: "user1",
      message: "Hello",
      timestamp: new Date().getTime(),
    };
    const response = await agent.processMessage(chatMessage);
    expect(response).toBeDefined();
    expect(response?.id).toBeDefined();
    expect(response?.chatroomId).toBe(chatMessage.chatroomId);
    expect(response?.sender).toBe(agent.getId());
    expect(response?.timestamp).toBeDefined();
  });

  it("returns null if there's a failure to process chat message", async () => {
    const getInstanceSpy = vi.spyOn(AI, "getInstance");

    getInstanceSpy.mockImplementation(async (): Promise<any> => {
      return {
        generateObject: async () => {
          throw new Error("AI error");
        },
      };
    });

    const persona: Persona = {
      key: "sample_persona",
      name: "Mr. Sample",
      description: "This is a sample persona for testing. ",
    };
    const agent = new Agent({ name: "AI Agent", persona });
    const chatMessage = {
      id: "1",
      chatroomId: "chatroom1",
      sender: "user1",
      message: "Hello",
      timestamp: new Date().getTime(),
    };
    const response = await agent.processMessage(chatMessage);
    expect(response).toBeNull();
  });
});
