/**
 * Filename: chatroom.ts
 * Author: Aditya Patange (AdiPat)
 * Description: Chatroom class for the AI Chatroom tool.
 * ✨ "The only way to do great work is to love what you do." – Steve Jobs
 */
export declare class Chatroom {
    private name;
    private id;
    /**
     * @description Chatroom class constructor
     * @param {string} name - The name of the chatroom
     */
    constructor({ name }: {
        name: string;
    });
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
}
