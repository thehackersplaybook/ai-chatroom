import { describe, expect, beforeEach, afterEach, it, vi } from "vitest";
import { Chatroom } from "../chatroom";

describe("Chatroom", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should create a new chatroom with name and id", () => {
    const chatroom = new Chatroom({ name: "AI Chatroom" });
    expect(chatroom.getName()).toBe("AI Chatroom");
    expect(chatroom.getId()).toBeDefined();
  });

  it("should reject invalid chatroom name", () => {
    const expectedErrorMessage = "Invalid chatroom name";
    expect(() => new Chatroom({ name: "" })).toThrowError(expectedErrorMessage);
    expect(() => new Chatroom({ name: "  " })).toThrowError(
      expectedErrorMessage
    );
  });

  it("should reject non-alphanumeric chatroom name", () => {
    const expectedErrorMessage =
      "Invalid chatroom name. Chatroom name should be alphanumeric. ";
    expect(() => new Chatroom({ name: "AI Chatroom!" })).toThrowError(
      expectedErrorMessage
    );
    expect(() => new Chatroom({ name: "AI Chatroom@" })).toThrowError(
      expectedErrorMessage
    );
    expect(() => new Chatroom({ name: "AI Chatroom#" })).toThrowError(
      expectedErrorMessage
    );
  });
});
