import { describe, expect, beforeEach, afterEach, it, vi } from "vitest";
import { Agent } from "../agent";
import { ChatMessage, Persona } from "../models";
import { AI } from "../ai";

describe("agent", () => {
  const descriptionAbove256Chars = "A".repeat(257);
  const standardName = "AI Agent";
  const standardPersona: Persona = {
    key: "sample_persona",
    name: "Mr. Sample",
    description: "This is a sample persona for testing. ",
  };
  let aiGetInstanceMock: any;
  let aiGetInstanceMockWithError: any;
  const standardChatMessage: ChatMessage = {
    id: "1",
    chatroomId: "chatroom1",
    sender: "user1",
    message: "Hello",
    timestamp: new Date().getTime(),
    isVisible: true,
    type: "agent",
  };

  beforeEach(() => {
    aiGetInstanceMock = async (): Promise<any> => {
      return {
        generateObject: async () => {
          return {
            object: {
              message: "Hello, how can I help you?",
            },
          };
        },
      };
    };
    aiGetInstanceMockWithError = async (): Promise<any> => {
      return {
        generateObject: async () => {
          throw new Error("AI error");
        },
      };
    };
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("initialization", () => {
    it("should create a new agent with name, id and persona", () => {
      const agent = new Agent({ name: standardName, persona: standardPersona });
      expect(agent.getName()).toBe(standardName);
      expect(agent.getId()).toBeDefined();
      expect(agent.getPersona()).toBeDefined();
    });

    it.each(["Mr@John", "", " ", "#91Mr"])(
      "throws an error if persona name ('%s') is invalid",
      (name) => {
        const persona: Persona = {
          ...standardPersona,
          name,
        };
        const expectedErrorMessage = "Invalid persona name";
        expect(() => new Agent({ name: standardName, persona })).toThrowError(
          expectedErrorMessage
        );
      }
    );

    it.each(["Mr. John", "Mr. John Doe", "Mr. John Doe Jr."])(
      "does not throw an error if persona name ('%s') is valid",
      (name) => {
        const persona: Persona = {
          ...standardPersona,
          name,
        };
        expect(() => new Agent({ name: standardName, persona })).not.toThrow();
      }
    );

    it("throws an error if persona description is above 256 characters", (name) => {
      const errorMessage =
        "Persona description should be less than 256 characters";
      const persona: Persona = {
        ...standardPersona,
        description: descriptionAbove256Chars,
      };
      expect(() => new Agent({ name: standardName, persona })).toThrowError(
        errorMessage
      );
    });

    it.each(["Ag@nt", "DrAg#Nt", "", "  "])(
      "throws an error if the agent name ('%s') is invalid",
      (name: string) => {
        const errorMessage = "Invalid agent name";
        expect(
          () => new Agent({ name, persona: standardPersona })
        ).toThrowError(errorMessage);
      }
    );

    it("selects the default model openai:gpt-4o if model is not provided", () => {
      const defaultModel = "openai:gpt-4o";
      const agent = new Agent({ name: standardName, persona: standardPersona });
      expect(agent.getModel()).toBe(defaultModel);
    });
  });

  describe("process message", () => {
    it("successfully processes the first chat message", async () => {
      const getInstanceSpy = vi.spyOn(AI, "getInstance");
      getInstanceSpy.mockImplementation(aiGetInstanceMock);
      const agent = new Agent({ name: standardName, persona: standardPersona });

      const response = await agent.processMessage(standardChatMessage);

      expect(response).toBeDefined();
      expect(response?.id).toBeDefined();
      expect(response?.chatroomId).toBe(standardChatMessage.chatroomId);
      expect(response?.sender).toBe(agent.getId());
      expect(response?.timestamp).toBeDefined();
    });

    it("returns null if there's a failure to process chat message by ai service", async () => {
      const getInstanceSpy = vi.spyOn(AI, "getInstance");
      getInstanceSpy.mockImplementation(aiGetInstanceMockWithError);
      const agent = new Agent({ name: standardName, persona: standardPersona });

      const response = await agent.processMessage(standardChatMessage);

      expect(response).toBeNull();
    });
  });
});
