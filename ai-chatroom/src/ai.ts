/**
 *
 * @file ai.ts
 * @author Aditya Patange <contact.adityapatange@gmail.com>
 * @description This is a simple abstraction built on top of Vercel AI SDK Core for convenience.
 * @date December 2024
 * @version 1.0.0
 * @license Affero General Public License v3.0
 * ✨ "The only limit to our realization of tomorrow is our doubts of today." - Franklin D. Roosevelt
 *
 */

import { anthropic } from "@ai-sdk/anthropic";
import { openai } from "@ai-sdk/openai";
import { generateText, generateObject, LanguageModel, CoreMessage } from "ai";
import { z } from "zod";

const openAIModels = [
  "o1",
  "o1-2024-12-17",
  "o1-mini",
  "o1-mini-2024-09-12",
  "o1-preview",
  "o1-preview-2024-09-12",
  "gpt-4o",
  "gpt-4o-2024-05-13",
  "gpt-4o-2024-08-06",
  "gpt-4o-2024-11-20",
  "gpt-4o-audio-preview",
  "gpt-4o-audio-preview-2024-10-01",
  "gpt-4o-audio-preview-2024-12-17",
  "gpt-4o-mini",
  "gpt-4o-mini-2024-07-18",
  "gpt-4-turbo",
  "gpt-4-turbo-2024-04-09",
  "gpt-4-turbo-preview",
  "gpt-4-0125-preview",
  "gpt-4-1106-preview",
  "gpt-4",
  "gpt-4-0613",
  "gpt-3.5-turbo-0125",
  "gpt-3.5-turbo",
  "gpt-3.5-turbo-1106",
];

const anthropicModels = [
  "claude-3-5-sonnet-latest",
  "claude-3-5-sonnet-20241022",
  "claude-3-5-sonnet-20240620",
  "claude-3-5-haiku-latest",
  "claude-3-5-haiku-20241022",
  "claude-3-opus-latest",
  "claude-3-opus-20240229",
  "claude-3-sonnet-20240229",
  "claude-3-haiku-20240307",
];

interface ModelProvider {
  availableModels: Array<string>;
  initializer: (modelId: string) => LanguageModel;
}

interface ModelsByProvider {
  [provider: string]: ModelProvider;
}

const modelsByProvider: ModelsByProvider = {
  anthropic: { availableModels: anthropicModels, initializer: anthropic },
  openai: { availableModels: openAIModels, initializer: openai },
};

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
 * AI: Convenience class for interacting with the AI models.
 */
export class AI {
  private model: LanguageModel;

  /**
   * Constructs an instance of the AI class.
   * @param model - The language model to use.
   */
  private constructor(model: LanguageModel) {
    this.model = model;
  }

  /**
   * Initializes an instance of the AI class with the specified model.
   * @param modelName The name of the model to instantiate the AI client with.
   * @returns AI instance
   */
  public static async getInstance(modelName: string): Promise<AI> {
    const model = await AI.getModel(modelName);
    return new AI(model);
  }

  /**
   * Generates text using the specified options.
   * @param options - The options for generating text.
   * @returns The generated text.
   */
  public async generateText(
    options: GenerateTextOptions
  ): Promise<ReturnType<typeof generateText>> {
    return await generateText({ ...options, model: this.model });
  }

  /**
   * Generates an object using the specified options.
   * @param options - The options for generating an object.
   * @returns The generated object.
   */
  public async generateObject(
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
  public static async getModel(modelName: string): Promise<LanguageModel> {
    try {
      const { model, provider } =
        AI.extractModelAndProviderFromModelConfig(modelName);

      if (!AI.providerHasModel(provider, model)) {
        throw new Error(`AI: model ${modelName} not found`);
      }

      return AI.initializeModelByProvider(provider, model);
    } catch (error) {
      console.error(error);
      throw new Error(`AI: model ${modelName} not found`);
    }
  }

  /**
   * Extracts the model and provider from the composite model name.
   * @param modelName The composite model name.
   * @returns The 'model' and 'provider' extracted from the composite model name.
   */
  private static extractModelAndProviderFromModelConfig(modelName: string): {
    model: string;
    provider: string;
  } {
    const [provider, model] = modelName.split(":");
    return {
      provider,
      model,
    };
  }

  /**
   * Checks the model availability for the provider.
   * @param provider The LLM provider.
   * @param model The LLM model.
   * @returns true if the provider has the model.
   */
  private static providerHasModel(provider: string, model: string): boolean {
    return Boolean(
      modelsByProvider?.[provider]?.availableModels?.includes(model)
    );
  }

  /**
   * Initializes the model by the provider.
   * @param provider The LLM provider.
   * @param model The LLM model.
   * @returns The initialized model.
   */
  private static initializeModelByProvider(
    provider: string,
    model: string
  ): LanguageModel {
    return modelsByProvider[provider].initializer(model);
  }
}
