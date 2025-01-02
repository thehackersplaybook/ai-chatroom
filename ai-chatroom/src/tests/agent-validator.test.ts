import { describe, expect, beforeEach, afterEach, it, vi } from "vitest";
import { AgentValidator } from "../agent-validator";
import { Persona } from "../models";

describe("agent validator", () => {
  let agentValidator: AgentValidator;
  let standardName: string = "AI Agent";
  let standardPersona: Persona = {
    key: "sample",
    name: "Mr. Sample",
    description: "This is a sample persona for testing. ",
  };

  beforeEach(() => {
    agentValidator = new AgentValidator();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("run validations", () => {
    it("does not throw error if agent name is valid", () => {
      expect(() =>
        agentValidator.runValidations(standardName, standardPersona)
      ).not.toThrow();
    });

    it("throws an error if the agent name is invalid", () => {
      const invalidAgentName = "Agent#1234";
      const expectedErrorMessage = "Invalid agent name";
      expect(() =>
        agentValidator.runValidations(invalidAgentName, standardPersona)
      ).toThrowError(expectedErrorMessage);
    });

    it("does not throw error if agent name and persona is valid", () => {
      expect(() =>
        agentValidator.runValidations(standardName, standardPersona)
      ).not.toThrow();
    });

    it.each([" ", "", "John@Cool", "Wick#3222"])(
      "throws an error if the persona name ('%s') is invalid",
      (personaName) => {
        const persona: Persona = {
          ...standardPersona,
          name: personaName,
        };
        const expectedErrorMessage = "Invalid persona name";
        expect(() =>
          agentValidator.runValidations(standardName, persona)
        ).toThrowError(expectedErrorMessage);
      }
    );

    it("throws an error if the persona description is above 256 characters", () => {
      const name = "AI Agent";
      const persona: Persona = {
        ...standardPersona,
        description: "a".repeat(257),
      };
      const expectedErrorMessage =
        "Persona description should be less than 256 characters";
      expect(() => agentValidator.runValidations(name, persona)).toThrowError(
        expectedErrorMessage
      );
    });
  });
});
