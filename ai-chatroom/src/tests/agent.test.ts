import { describe, expect, beforeEach, afterEach, it, vi } from "vitest";
import { Agent } from "../agent";
import { Persona } from "../models";

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
});
