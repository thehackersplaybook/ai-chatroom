import { Persona } from "./models";
import { Simulation, SimulationInitOptions, Simulator } from "./simulation";
interface ChatroomOptions {
    name?: string;
}
interface AgentOptions {
    persona: Persona;
}
interface ChatSimulationOptions {
    prompt?: string;
    agentCount?: number;
    chatroom?: ChatroomOptions;
    agents?: AgentOptions[];
}
/**
 * ChatSimulation class for simulating a chatroom environment.
 */
export declare class ChatSimulation extends Simulation implements Simulator<ChatSimulationOptions> {
    private DEFAULT_AGENT_COUNT;
    private chatSimulationStore;
    constructor(options?: SimulationInitOptions);
    /**
     * Sets up the chat simulation with the specified options.
     * @param options The options for setting up the chat simulation.
     * @returns The promise that resolves to a boolean indicating whether the setup was successful.
     */
    setup(options: ChatSimulationOptions): Promise<boolean>;
    /**
     * Setup the chat simulation with the specified prompt and options.
     * @param prompt The prompt for the chat simulation.
     * @param options The options for the chat simulation.
     * @returns The promise that resolves to a boolean indicating whether the setup was successful.
     */
    private setupWithPrompt;
    /**
     * Creates a chatroom for the chat simulation.
     * @param options The options for creating a chatroom.
     * @returns Chatroom instance
     */
    private createChatroom;
    /**
     * Generates a description for the chatroom simulation based on the prompt.
     * @param prompt The prompt for the chatroom simulation.
     * @returns A promise that resolves to the description of the chatroom.
     */
    private getChatroomDescriptionFromPrompt;
    /**
     * Creates agents for the chat simulation.
     * @returns A promise that resolves to an array of agents.
     */
    private createAgents;
    /**
     * Creates a single agent for the chat simulation.
     * @param agentsCreated The number of agents created.
     * @param agents The agents created so far.
     * @param personasSelected The personas selected so far.
     * @returns The total number of agents created.
     */
    private createSingleAgent;
    /**
     * Validates the number of agents to create against the number of unique personas available.
     * @param agentCount The number of agents to create.
     */
    private validateAgentCountToUniquePersonas;
    /**
     * Simulates a chatroom with the specified options.
     * @param options - The options for simulating the chatroom.
     * @returns A promise that resolves when the simulation is complete.
     */
    simulate(options: ChatSimulationOptions): Promise<void>;
}
export {};
