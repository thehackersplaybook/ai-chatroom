/**
 *
 * @file chat-simulation.ts
 * @author Aditya Patange (AdiPat) <contact.adityapatange@gmail.com>
 * @description Chat Simulation for simulating a bunch of machines talking to each other in a virtual environment.
 * @date January 2024
 * @version 1.0.0
 * @license Affero General Public License v3.0
 * ✨ "Oh I see, IC." – Oen
 *
 */
import { Agent } from "./agent";
import { Chatroom, ChatroomInitOptions } from "./chatroom";
import { Common } from "./common";
import { Id, Persona } from "./models";
import { personas } from "./personas";
import { Prompts } from "./prompts";
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

interface ChatSimulationStore {
  chatrooms: Chatroom[];
  chatroomToAgents: Map<Id, Agent[]>;
}

/**
 * ChatSimulation class for simulating a chatroom environment.
 */
export class ChatSimulation
  extends Simulation
  implements Simulator<ChatSimulationOptions>
{
  private DEFAULT_AGENT_COUNT = 3;
  private chatSimulationStore: ChatSimulationStore = {
    chatrooms: [],
    chatroomToAgents: new Map(),
  };

  constructor(options?: SimulationInitOptions) {
    super(options);
  }

  /**
   * Sets up the chat simulation with the specified options.
   * @param options The options for setting up the chat simulation.
   * @returns The promise that resolves to a boolean indicating whether the setup was successful.
   */
  public async setup(options: ChatSimulationOptions): Promise<boolean> {
    await this.initAI();
    const prompt = options.prompt;

    if (prompt) {
      return await this.setupWithPrompt(prompt, options);
    }

    return false;
  }

  /**
   * Setup the chat simulation with the specified prompt and options.
   * @param prompt The prompt for the chat simulation.
   * @param options The options for the chat simulation.
   * @returns The promise that resolves to a boolean indicating whether the setup was successful.
   */
  private async setupWithPrompt(
    prompt: string,
    options: ChatSimulationOptions
  ): Promise<boolean> {
    const chatroomOptions: ChatroomInitOptions = {
      name: Common.generateRandomName(),
    };
    const chatroom = await this.createChatroom(prompt, chatroomOptions);
    const agents = await this.createAgents(options.agentCount);

    for (const agent of agents) {
      await chatroom.addAgent(agent);
    }

    this.chatSimulationStore.chatrooms.push(chatroom);
    this.chatSimulationStore.chatroomToAgents.set(chatroom.getId(), agents);
    return true;
  }

  /**
   * Creates a chatroom for the chat simulation.
   * @param options The options for creating a chatroom.
   * @returns Chatroom instance
   */
  private async createChatroom(
    prompt: string,
    options: ChatroomInitOptions
  ): Promise<Chatroom> {
    const chatroom = new Chatroom(options);
    const description = await this.getChatroomDescriptionFromPrompt(prompt);
    chatroom.setDescription(description);
    this.chatSimulationStore.chatrooms.push(chatroom);
    return chatroom;
  }

  /**
   * Generates a description for the chatroom simulation based on the prompt.
   * @param prompt The prompt for the chatroom simulation.
   * @returns A promise that resolves to the description of the chatroom.
   */
  private async getChatroomDescriptionFromPrompt(
    prompt: string
  ): Promise<string> {
    try {
      const result = await this.ai?.generateText({
        prompt: Prompts.chatSimulation.generateDescription(prompt),
      });
      return result?.text || "";
    } catch (error) {
      console.error("Error generating chatroom description: ", error);
      return "";
    }
  }

  /**
   * Creates agents for the chat simulation.
   * @returns A promise that resolves to an array of agents.
   */
  private async createAgents(
    agentCount = this.DEFAULT_AGENT_COUNT
  ): Promise<Agent[]> {
    this.validateAgentCountToUniquePersonas(agentCount);

    const agents: Agent[] = [];
    const personasSelected = new Set<string>();
    let agentsCreated = 0;

    while (agentsCreated < agentCount) {
      agentsCreated = this.createSingleAgent(
        agentsCreated,
        agents,
        personasSelected
      );
    }

    return agents;
  }

  /**
   * Creates a single agent for the chat simulation.
   * @param agentsCreated The number of agents created.
   * @param agents The agents created so far.
   * @param personasSelected The personas selected so far.
   * @returns The total number of agents created.
   */
  private createSingleAgent(
    agentsCreated: number,
    agents: Agent[],
    personasSelected: Set<string>
  ): number {
    const persona = personas[Common.generateRandomInteger(0, personas.length)];

    if (!persona || personasSelected.has(persona.key)) {
      return agentsCreated;
    }

    const agent = new Agent({ name: persona.name, persona });
    agents.push(agent);
    personasSelected.add(persona.key);
    const totalAgentsCreated = agentsCreated + 1;
    return totalAgentsCreated;
  }

  /**
   * Validates the number of agents to create against the number of unique personas available.
   * @param agentCount The number of agents to create.
   */
  private validateAgentCountToUniquePersonas(agentCount: number): void {
    if (agentCount > personas.length) {
      throw new Error(
        "Unable to create the required number of unique agent personas."
      );
    }
  }

  /**
   * Simulates a chatroom with the specified options.
   * @param options - The options for simulating the chatroom.
   * @returns A promise that resolves when the simulation is complete.
   */
  public async simulate(options: ChatSimulationOptions): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
