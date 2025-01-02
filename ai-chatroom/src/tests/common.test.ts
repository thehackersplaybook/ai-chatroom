import { describe, expect, beforeEach, afterEach, it, vi } from "vitest";
import { Common } from "../common";

describe("common", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("is alphanumeric", () => {
    it.each(["abc", "123", "abc123"])(
      "should return true for '%s'",
      (input: string) => {
        expect(Common.isAlphaNumeric(input)).toBe(true);
      }
    );

    it.each(["abc!", "abc@", "abc#", "abc123ABC@", "abc123ABC#"])(
      "should return false for '%s'",
      (input: string) => {
        expect(Common.isAlphaNumeric(input)).toBe(false);
      }
    );
  });

  describe("is valid name", () => {
    it.each(["John", "John Doe", "John Doe Jr."])(
      "should return true for '%s'",
      (input: string) => {
        expect(Common.isValidName(input)).toBe(true);
      }
    );

    it.each(["Mr@John", "", " ", "#91Mr"])(
      "should return false for '%s'",
      (input: string) => {
        expect(Common.isValidName(input)).toBe(false);
      }
    );
  });

  describe("is url", () => {
    it.each([
      "http://www.google.com",
      "https://www.google.com",
      "https://www.amazon.com",
    ])("should return true for '%s'", (input: string) => {
      expect(Common.isUrl(input)).toBe(true);
    });

    it.each(["google.com", "google", "google@com", "www.website.in"])(
      "should return false for '%s'",
      (input: string) => {
        expect(Common.isUrl(input)).toBe(false);
      }
    );
  });

  describe("generate random name", () => {
    it("should generate a random name", () => {
      const minLength = 8;
      const name = Common.generateRandomName();
      expect(name).toBeDefined();
      expect(name.length).toBeGreaterThan(minLength);
    });
  });
});
