/**
 * Filename: agent.ts
 * Author: Aditya Patange (AdiPat)
 * Description: Agent class for the AI Chatroom tool.
 * ✨ "We win because we choose." — Anonymous
 */
import { ChatMessage, Persona } from "./models";
interface AgentInitOptions {
    name: string;
    persona: Persona;
    model?: string;
}
/**
 * Agent class for the AI Chatroom tool.
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
     */
    constructor({ name, persona, model }: AgentInitOptions);
    /**
     * Initializes the AI model for the agent.
     */
    private initAI;
    /**
     * Returns the name of the agent.
     * @returns The name of the agent.
     */
    getName(): string;
    /**
     * Returns the ID of the agent.
     * @returns The ID of the agent.
     */
    getId(): string;
    /**
     * Returns the persona of the agent.
     * @returns persona of the agent
     */
    getPersona(): Persona;
    /**
     * Processes the message and generates a response.
     * @param message The message to process
     * @returns The response to the message
     */
    processMessage(message: ChatMessage): Promise<ChatMessage | null>;
}
export {};
