/**
 * Filename: chatroom.ts
 * Author: Aditya Patange (AdiPat)
 * Description: Chatroom class for the AI Chatroom tool.
 * ✨ "The only way to do great work is to love what you do." – Steve Jobs
 */

import { v4 as uuid } from "uuid";
import { Common } from "./common";

export class Chatroom {
  private name: string;
  private id: string;

  /**
   * @description Chatroom class constructor
   * @param {string} name - The name of the chatroom
   */
  constructor({ name }: { name: string }) {
    this.validateName(name);
    this.id = uuid();
    this.name = name;
  }

  /**
   * Validates the name of the chatroom.
   * @param name - The name of the chatroom
   * @throws Error if the name is invalid
   * @returns void
   */
  private validateName(name: string): void {
    if (!name || !name.trim()) {
      throw new Error("Invalid chatroom name");
    }

    if (!Common.isAlphaNumeric(name)) {
      throw new Error(
        "Invalid chatroom name. Chatroom name should be alphanumeric. "
      );
    }
  }

  /**
   * Returns the name of the chatroom
   * @returns {string} The name of the chatroom
   */
  getName(): string {
    return this.name;
  }

  /**
   * Get the ID of the chatroom
   * @returns {string} The ID of the chatroom
   */
  getId(): string {
    return this.id;
  }
}
