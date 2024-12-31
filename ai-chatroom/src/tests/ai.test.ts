import { describe, expect, beforeEach, afterEach, it, vi } from "vitest";
import { AI } from "../ai";
import { z } from "zod";
import { LanguageModel } from "ai";

describe("AI", () => {
  let ai: AI;
  let model: LanguageModel;

  beforeEach(async () => {
    model = await AI.getModel("openai:gpt-4o");
    ai = new AI(model);

    vi.spyOn(ai, "generateText").mockResolvedValue({
      text: "Hello, world!",
    } as any);

    vi.spyOn(ai, "generateObject").mockResolvedValue({
      object: {
        name: "John Doe",
        age: 30,
        email: "john@hmail.com",
      },
    } as any);

    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should generate text", async () => {
    const { text } = await ai.generateText({
      prompt: "Hello, world!",
    });
    expect(text).toBeDefined();
  });

  it("should generate object", async () => {
    const { object } = await ai.generateObject({
      prompt: "Hello, world!",
      schema: z.object({
        name: z.string(),
        age: z.number(),
        email: z.string().email(),
      }),
    });
    expect(object).toBeDefined();
  });
});