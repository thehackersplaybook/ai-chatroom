/**
 * Filename: agent.ts
 * Author: Aditya Patange (AdiPat)
 * Description: Agent class for the AI Chatroom tool.
 * ✨ "We win because we choose." — Anonymous
 */

import { v4 as uuid } from "uuid";
import { ChatMessage, Persona } from "./models";
import { AI } from "./ai";
import { AgentValidator } from "./agent-validator";
import { z } from "zod";
import { ChatDriver } from "./chat-driver";

interface AgentInitOptions {
  name: string;
  persona: Persona;
  model?: string;
}

/**
 * Agent class for the AI Chatroom tool.
 */
export class Agent {
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
   * Initializes the AI model for the agent.
   */
  private async initAI(): Promise<void> {
    if (!this.model) {
      this.model = this.DEFAULT_AI_MODEL;
    }

    if (!this.ai) {
      this.ai = await AI.getInstance(this.model);
    }
  }

  /**
   * Returns the name of the agent.
   * @returns The name of the agent.
   */
  public getName(): string {
    return this.name;
  }

  /**
   * Returns the ID of the agent.
   * @returns The ID of the agent.
   */
  public getId(): string {
    return this.id;
  }

  /**
   * Returns the persona of the agent.
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
   * @returns The response to the message
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

      const response = ChatDriver.buildChatMessage(
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
