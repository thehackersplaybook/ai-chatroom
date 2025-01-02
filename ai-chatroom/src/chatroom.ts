/**
 *
 * @file chatroom.ts
 * @author Aditya Patange (AdiPat) <contact.adityapatange@gmail.com>
 * @description 🚀 Chatroom where the agents interact
 * @date December 2024
 * @version 1.0.0
 * @license Affero General Public License v3.0
 * ✨ "The only way to do great work is to love what you do." – Steve Jobs
 *
 */

import { v4 as uuid } from "uuid";
import { Common } from "./common";
import { ChatDriver } from "./chat-driver";
import { Agent } from "./agent";
import { ChatMessage } from "./models";

type Agents = {
  [agentId: string]: Agent;
};

export interface ChatroomInitOptions {
  name: string;
}

/**
 * Chatroom where the agents interact
 */
export class Chatroom {
  private name: string;
  private id: string;
  private chatDriver: ChatDriver = new ChatDriver();
  private agents: Agents = {};

  /**
   * @description Chatroom class constructor
   * @param {string} name - The name of the chatroom
   */
  constructor({ name }: ChatroomInitOptions) {
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

  /**
   * Checks if the agent exists in the chatroom
   * @param agent The agent to check for existence
   * @returns true if the agent exists in the chatroom
   */
  public agentExists(agent: Agent): boolean {
    return Boolean(this.agents[agent.getId()]);
  }

  /**
   * Returns the chat driver instance associated with the chatroom
   * @returns ChatDriver The chat driver instance associated with the chatroom
   */
  public getChatDriver(): ChatDriver {
    return this.chatDriver;
  }

  /**
   * Adds an agent to the chatroom
   * @param agent Agent to be added to the chatroom
   * @returns void
   */
  public async addAgent(agent: Agent): Promise<void> {
    if (this.agentExists(agent)) {
      throw new Error("Agent already exists in the chatroom. ");
    }

    const agentId = agent.getId();
    this.agents[agentId] = agent;

    const handler = async (message: ChatMessage) => {
      if (message.chatroomId === this.id && message.sender !== agentId) {
        const response = await agent.processMessage(message);

        if (response) {
          await this.chatDriver.sendMessage(response);
        }
      }
    };

    this.chatDriver.addOnMessageHandler(handler.bind(this));
  }
}
