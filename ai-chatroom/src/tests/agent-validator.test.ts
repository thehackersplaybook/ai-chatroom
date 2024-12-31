import { describe, expect, beforeEach, afterEach, it, vi } from "vitest";
import { AgentValidator } from "../agent-validator";
import { Persona } from "../models";

describe("Agent Validator", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("validates the agent name", () => {
    const agentValidator = new AgentValidator();
    const name = "AI Agent";
    const persona: Persona = {
      key: "sample",
      name: "Mr. Sample",
      description: "This is a sample persona for testing. ",
    };
    expect(() => agentValidator.runValidations(name, persona)).not.toThrow();
  });

  it("throws an error if the agent name is invalid", () => {
    const agentValidator = new AgentValidator();
    const name = "";
    const persona: Persona = {
      key: "sample",
      name: "Mr. Sample",
      description: "This is a sample persona for testing. ",
    };
    const expectedErrorMessage = "Invalid agent name";
    expect(() => agentValidator.runValidations(name, persona)).toThrowError(
      expectedErrorMessage
    );
  });

  it("validates the persona", () => {
    const agentValidator = new AgentValidator();
    const name = "AI Agent";
    const persona: Persona = {
      key: "sample",
      name: "Mr. Sample",
      description: "This is a sample persona for testing. ",
    };
    expect(() => agentValidator.runValidations(name, persona)).not.toThrow();
  });

  it.each([" ", "", "John@Cool", "Wick#3222"])(
    "throws an error if the persona name ('%s') is invalid",
    (personaName) => {
      const agentValidator = new AgentValidator();
      const name = "AI Agent";
      const persona: Persona = {
        key: "sample",
        name: personaName,
        description: "This is a sample persona for testing. ",
      };
      const expectedErrorMessage = "Invalid persona name";
      expect(() => agentValidator.runValidations(name, persona)).toThrowError(
        expectedErrorMessage
      );
    }
  );

  it("throws an error if the persona description is above 256 characters", () => {
    const agentValidator = new AgentValidator();
    const name = "AI Agent";
    const persona: Persona = {
      key: "sample",
      name: "Mr. Sample",
      description: "a".repeat(257),
    };
    const expectedErrorMessage =
      "Persona description should be less than 256 characters";
    expect(() => agentValidator.runValidations(name, persona)).toThrowError(
      expectedErrorMessage
    );
  });
});
