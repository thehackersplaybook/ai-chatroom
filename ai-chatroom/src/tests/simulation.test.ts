import { describe, expect, beforeEach, afterEach, it, vi } from "vitest";
import { Simulation } from "../simulation";

describe("simulation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("initialization", () => {
    it("initializes a new simulator with name and id", () => {
      const simulator = new Simulation({ name: "AI Simulator" });
      expect(simulator.getName()).toBe("AI Simulator");
      expect(simulator.getId()).toBeDefined();
    });

    it("initializes with a random name if name is not provided", () => {
      const minNameLength = 8;
      const simulator = new Simulation();
      expect(simulator.getName()).toBeDefined();
      expect(simulator.getName().length).toBeGreaterThan(minNameLength);
    });

    it("two simulations can't have the same randomly generated name", () => {
      const simulator1 = new Simulation();
      const simulator2 = new Simulation();
      expect(simulator1.getName()).not.toBe(simulator2.getName());
    });

    it("two simulations can have the same name if provided", () => {
      const simulator1 = new Simulation({ name: "AI Simulator" });
      const simulator2 = new Simulation({ name: "AI Simulator" });
      expect(simulator1.getName()).toBe(simulator2.getName());
    });

    it.each(["", "  ", "Sim#70"])(
      "rejects invalid simulator name ('%s')",
      (name) => {
        const expectedErrorMessage = "Invalid simulator name";
        expect(() => new Simulation({ name })).toThrowError(
          expectedErrorMessage
        );
      }
    );

    it("two simulations can't have the same id", () => {
      const simulator1 = new Simulation();
      const simulator2 = new Simulation();
      expect(simulator1.getId()).not.toBe(simulator2.getId());
    });
  });
});
