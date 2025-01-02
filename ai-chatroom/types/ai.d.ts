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
 * AI: Convenience class for interacting with the AI models.
 */
export declare class AI {
    private model;
    /**
     * Constructs an instance of the AI class.
     * @param model - The language model to use.
     */
    private constructor();
    /**
     * Initializes an instance of the AI class with the specified model.
     * @param modelName The name of the model to instantiate the AI client with.
     * @returns AI instance
     */
    static getInstance(modelName: string): Promise<AI>;
    /**
     * Generates text using the specified options.
     * @param options - The options for generating text.
     * @returns The generated text.
     */
    generateText(options: GenerateTextOptions): Promise<ReturnType<typeof generateText>>;
    /**
     * Generates an object using the specified options.
     * @param options - The options for generating an object.
     * @returns The generated object.
     */
    generateObject(options: GenerateObjectOptions): Promise<ReturnType<typeof generateObject>>;
    /**
     * Retrieves a language model by its name.
     * @param modelName - The name of the model to retrieve.
     * @returns The language model.
     * @throws An error if the model is not found.
     */
    static getModel(modelName: string): Promise<LanguageModel>;
    /**
     * Extracts the model and provider from the composite model name.
     * @param modelName The composite model name.
     * @returns The 'model' and 'provider' extracted from the composite model name.
     */
    private static extractModelAndProviderFromModelConfig;
    /**
     * Checks the model availability for the provider.
     * @param provider The LLM provider.
     * @param model The LLM model.
     * @returns true if the provider has the model.
     */
    private static providerHasModel;
    /**
     * Initializes the model by the provider.
     * @param provider The LLM provider.
     * @param model The LLM model.
     * @returns The initialized model.
     */
    private static initializeModelByProvider;
}
export {};
