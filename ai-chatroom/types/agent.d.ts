/**
 *
 * @file agent.ts
 * @author Aditya Patange (AdiPat) <contact.adityapatange@gmail.com>
 * @description 🚀 Agent: The central entity that interacts with the world.
 * @date December 2024
 * @version 1.0.0
 * @license Affero General Public License v3.0
 * ✨ "Smoother the smoke, better the inspiration. " — Anonymous
 *
 */
import { ChatMessage, Persona } from "./models";
export interface AgentInitOptions {
    name: string;
    persona: Persona;
    model?: string;
}
/**
 * Agent class represents an agent that can interact with the world.
 */
export declare class Agent {
    private DEFAULT_AI_MODEL;
    private name;
    private id;
    private persona;
    private model;
    private ai;
    private agentValidator;
    /**
     * Constructs an instance of the Agent class.
     * @param name name of the agent
     * @param persona persona of the agent
     * @param model model to use for AI
     */
    constructor({ name, persona, model }: AgentInitOptions);
    /**
     * Initializes the AI model and client for the agent.
     */
    private initAI;
    /**
     * Gets the name of the agent.
     * @returns The name of the agent.
     */
    getName(): string;
    /**
     * Gets the ID of the agent.
     * @returns The ID of the agent.
     */
    getId(): string;
    /**
     * Gets the model of the agent.
     * @returns The model of the agent.
     */
    getModel(): string;
    /**
     * Gets the persona of the agent.
     * @returns persona of the agent
     */
    getPersona(): Persona;
    /**
     * Processes the message and generates a response.
     * @param message The message to process
     * @returns The response to the message or null if the response could not be generated
     */
    processMessage(message: ChatMessage): Promise<ChatMessage | null>;
}
