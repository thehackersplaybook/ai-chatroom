/**
 * @file ai.ts
 * @author Aditya Patange <contact.adityapatange@gmail.com>
 * @description This file contains the AI class which provides methods to generate text and objects using a specified language model.
 * ✨ "The only limit to our realization of tomorrow is our doubts of today." - Franklin D. Roosevelt
 * @date December 2024
 * @version 1.0.0
 */

import { anthropic } from "@ai-sdk/anthropic";
import { openai } from "@ai-sdk/openai";
import { generateText, generateObject, LanguageModel, CoreMessage } from "ai";
import { z } from "zod";

interface GenerateTextOptions {
  prompt?: string;
  system?: string;
  messages?: Array<CoreMessage>;
  temperature?: number;
  maxTokens?: number;
  maxRetries?: number;
  topK?: number;
  topP?: number;
  frequencyPenalty?: number;
}

interface GenerateObjectOptions {
  prompt?: string;
  messages?: Array<CoreMessage>;
  schema: z.ZodObject<any>;
  system?: string;
  temperature?: number;
  maxTokens?: number;
  maxRetries?: number;
  topK?: number;
  topP?: number;
  frequencyPenalty?: number;
}

/**
 * AI class provides methods to generate text and objects using a specified language model.
 */
export class AI {
  private static instance: AI | null = null;
  private model: LanguageModel;

  /**
   * Constructs an instance of the AI class.
   * @param model - The language model to use.
   */
  private constructor(model: LanguageModel) {
    this.model = model;
  }

  /**
   * Generates text using the specified options.
   * @param options - The options for generating text.
   * @returns The generated text.
   */
  async generateText(
    options: GenerateTextOptions
  ): Promise<ReturnType<typeof generateText>> {
    return await generateText({ ...options, model: this.model });
  }

  /**
   * Generates an object using the specified options.
   * @param options - The options for generating an object.
   * @returns The generated object.
   */
  async generateObject(
    options: GenerateObjectOptions
  ): Promise<ReturnType<typeof generateObject>> {
    return await generateObject({ ...options, model: this.model });
  }

  /**
   * Retrieves a language model by its name.
   * @param modelName - The name of the model to retrieve.
   * @returns The language model.
   * @throws An error if the model is not found.
   */
  static async getModel(modelName: string): Promise<LanguageModel> {
    try {
      const [provider, model] = modelName.split(":");

      if (provider == "anthropic") {
        return anthropic(model);
      } else if (provider == "openai") {
        return openai(model);
      }

      throw new Error(`AI: provider ${provider} not found`);
    } catch (error) {
      console.error(error);
      throw new Error(`AI: model ${modelName} not found`);
    }
  }

  /**
   * Initializes an instance of the AI class with the specified model.
   * @param modelName The name of the model to instantiate the AI client with.
   * @returns AI instance
   */
  public static async getInstance(modelName: string): Promise<AI> {
    if (!AI.instance) {
      const model = await AI.getModel(modelName);
      AI.instance = new AI(model);
    }
    return AI.instance;
  }
}
