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
import { ChatDriver } from "./chat-driver";
import { Agent } from "./agent";
export interface ChatroomInitOptions {
    name: string;
}
/**
 * Chatroom where the agents interact
 */
export declare class Chatroom {
    private id;
    private name;
    private description;
    private chatDriver;
    private agents;
    /**
     * @description Chatroom class constructor
     * @param {string} name - The name of the chatroom
     */
    constructor({ name }: ChatroomInitOptions);
    /**
     * Validates the name of the chatroom.
     * @param name - The name of the chatroom
     * @throws Error if the name is invalid
     * @returns void
     */
    private validateName;
    /**
     * Returns the name of the chatroom
     * @returns {string} The name of the chatroom
     */
    getName(): string;
    /**
     * Get the ID of the chatroom
     * @returns {string} The ID of the chatroom
     */
    getId(): string;
    /**
     * Checks if the agent exists in the chatroom
     * @param agent The agent to check for existence
     * @returns true if the agent exists in the chatroom
     */
    agentExists(agent: Agent): boolean;
    /**
     * Returns the chat driver instance associated with the chatroom
     * @returns ChatDriver The chat driver instance associated with the chatroom
     */
    getChatDriver(): ChatDriver;
    /**
     * Returns the description of the chatroom
     * @returns {string} The description of the chatroom
     */
    getDescription(): string;
    /**
     * Sets the description of the chatroom
     * @param description The description of the chatroom
     * @returns void
     */
    setDescription(description: string): void;
    /**
     * Adds an agent to the chatroom
     * @param agent Agent to be added to the chatroom
     * @returns void
     */
    addAgent(agent: Agent): Promise<void>;
}
