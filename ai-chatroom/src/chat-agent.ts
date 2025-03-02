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

import { v4 as uuid } from "uuid";
import { Agent, ChatMessage, Persona } from "./models";
import { AI } from "./ai";
import { AgentValidator } from "./agent-validator";
import { z } from "zod";
import { ChatDriver } from "./chat-driver";
import { ChatMessageBuilder } from "./chat-message-builder";

export interface AgentInitOptions {
  name: string;
  persona: Persona;
  model?: string;
}

/**
 * Agent class represents an agent that can interact with the world.
 */
export class ChatAgent implements Agent {
  private DEFAULT_AI_MODEL = "openai:gpt-4o";

  private name: string;
  private id: string;
  private persona: Persona;
  private model: string | null = null;
  private ai: AI | null = null;
  private agentValidator: AgentValidator = new AgentValidator();

  /**
   * Constructs an instance of the Agent class.
   * @param name name of the agent
   * @param persona persona of the agent
   * @param model model to use for AI
   */
  constructor({ name, persona, model }: AgentInitOptions) {
    this.agentValidator.runValidations(name, persona);
    this.name = name;
    this.id = uuid();
    this.persona = persona;
    this.model = model || this.DEFAULT_AI_MODEL;
    this.initAI();
  }

  /**
   * Initializes the AI model and client for the agent.
   */
  private async initAI(): Promise<void> {
    if (!this.ai) {
      this.ai = await AI.getInstance(this.model as string);
    }
  }

  /**
   * Gets the name of the agent.
   * @returns The name of the agent.
   */
  public getName(): string {
    return this.name;
  }

  /**
   * Gets the ID of the agent.
   * @returns The ID of the agent.
   */
  public getId(): string {
    return this.id;
  }

  /**
   * Gets the model of the agent.
   * @returns The model of the agent.
   */
  public getModel(): string {
    return this.model as string;
  }

  /**
   * Gets the persona of the agent.
   * @returns persona of the agent
   */
  public getPersona(): Persona {
    return {
      ...this.persona,
    };
  }

  /**
   * Processes the message and generates a response.
   * @param message The message to process
   * @returns The response to the message or null if the response could not be generated
   */
  public async processMessage(
    message: ChatMessage
  ): Promise<ChatMessage | null> {
    try {
      await this.initAI();

      const ai = this.ai as AI;

      const { object }: any = await ai.generateObject({
        system: "You are an AI chat agent, given a message, reply to it.",
        prompt: message.message,
        schema: z.object({
          message: z.string(),
        }),
      });

      const response = ChatMessageBuilder.buildAgentChatMessage(
        message.chatroomId,
        object.message,
        this.id
      );

      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
