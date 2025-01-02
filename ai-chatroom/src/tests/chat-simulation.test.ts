import { describe, expect, beforeEach, afterEach, it, vi } from "vitest";
import { ChatSimulation } from "../chat-simulation";
import { AI } from "../ai";

describe("simulation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("setup", () => {
    it("sets up the simulation with a prompt", async () => {
      vi.spyOn(AI, "getInstance").mockResolvedValue({
        generateText: async () => {
          return {
            text: "This is a simple simulation where a bunch of AI agents talk to each other.",
          };
        },
      } as any);
      const chatSimulation = new ChatSimulation();
      const status = await chatSimulation.setup({
        prompt:
          "This is a simple simulation where a bunch of AI agents talk to each other.",
      });
      expect(status).toBe(true);
    });

    it("throws an error if number of agents exceeds the number of unique personas", async () => {
      vi.spyOn(AI, "getInstance").mockResolvedValue({
        generateText: async () => {
          return {
            text: "This is a simple simulation where a bunch of AI agents talk to each other.",
          };
        },
      } as any);
      const chatSimulation = new ChatSimulation();
      const statusPromise = chatSimulation.setup({
        prompt:
          "This is a simple simulation where a bunch of AI agents talk to each other.",
        agentCount: 100,
      });
      await expect(statusPromise).rejects.toThrowError(
        "Unable to create the required number of unique agent personas."
      );
    });
  });
});
