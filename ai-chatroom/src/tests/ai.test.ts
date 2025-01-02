import { describe, expect, beforeEach, afterEach, it, vi } from "vitest";
import { AI } from "../ai";
import { z } from "zod";

describe("ai", () => {
  let openAIInstance: AI;
  let anthropicInstance: AI;
  const openAIModel = "openai:gpt-4o";
  const anthropicModel = "anthropic:claude-3-5-sonnet-latest";
  const standardPrompt = "Hello, world!";
  const standardSchema = z.object({
    name: z.string(),
    age: z.number(),
    email: z.string().email(),
  });

  beforeEach(async () => {
    openAIInstance = await AI.getInstance(openAIModel);
    anthropicInstance = await AI.getInstance(anthropicModel);
    vi.spyOn(openAIInstance, "generateText").mockResolvedValue({
      text: "Hello, world!",
    } as any);

    vi.spyOn(openAIInstance, "generateObject").mockResolvedValue({
      object: {
        name: "John Doe",
        age: 30,
        email: "john@hmail.com",
      },
    } as any);

    vi.spyOn(anthropicInstance, "generateText").mockResolvedValue({
      text: "Hello, world!",
    } as any);

    vi.spyOn(anthropicInstance, "generateObject").mockResolvedValue({
      object: {
        name: "John Doe",
        age: 30,
        email: "john@gmail.com",
      },
    } as any);

    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("generate text", () => {
    it("should generate text for openai model", async () => {
      const { text } = await openAIInstance.generateText({
        prompt: standardPrompt,
      });
      expect(text).toBeDefined();
    });

    it("should generate text for anthropic model", async () => {
      const { text } = await anthropicInstance.generateText({
        prompt: standardPrompt,
      });
      expect(text).toBeDefined();
    });
  });

  describe("generate object", () => {
    it("should generate object for openai instance", async () => {
      const { object } = await openAIInstance.generateObject({
        prompt: standardPrompt,
        schema: standardSchema,
      });
      expect(object).toBeDefined();
    });

    it("should generate object for anthropic instance", async () => {
      const { object } = await anthropicInstance.generateObject({
        prompt: standardPrompt,
        schema: standardSchema,
      });
      expect(object).toBeDefined();
    });
  });

  describe("get instance", () => {
    it.each([openAIModel, anthropicModel])(
      `should return an instance of the AI class for '%s' model`,
      async (model) => {
        const ai = await AI.getInstance(model);
        expect(ai).toBeInstanceOf(AI);
        expect(ai).toBeDefined();
      }
    );

    it.each([
      "invalid-model",
      "openai:unknown-model",
      "gemini:flash",
      "anthropic:invalid-model",
    ])(
      "should throw an error if model ('%s') is invalid",
      async (invalidModel) => {
        const expectedErrorMessage = `AI: model ${invalidModel} not found`;
        await expect(AI.getInstance(invalidModel)).rejects.toThrowError(
          expectedErrorMessage
        );
      }
    );
  });
});
