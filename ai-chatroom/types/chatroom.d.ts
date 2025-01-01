/**
 * Filename: chatroom.ts
 * Author: Aditya Patange (AdiPat)
 * Description: Chatroom class for the AI Chatroom tool.
 * ✨ "The only way to do great work is to love what you do." – Steve Jobs
 */
import { ChatDriver } from "./chat-driver";
import { Agent } from "./agent";
export interface ChatroomInitOptions {
    name: string;
}
export declare class Chatroom {
    private name;
    private id;
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
     * Adds an agent to the chatroom
     * @param agent Agent to be added to the chatroom
     * @returns void
     */
    addAgent(agent: Agent): Promise<void>;
}
