/**
 *
 * @file simulator.ts
 * @author Aditya Patange (AdiPat) <contact.adityapatange@gmail.com>
 * @description 🚀 Simulator. Nothing more, nothing less.
 * @date December 2024
 * @version 1.0.0
 * @license Affero General Public License v3.0
 * ✨ "We aren't simulated, we simulate." – Hybrizo SS
 *
 */

import { AI } from "./ai";
import { Common } from "./common";
import { v4 as uuid } from "uuid";

export interface Simulator<T> {
  setup: (options: T) => Promise<boolean>;
  simulate: (options: any) => Promise<void>;
}

export interface SimulationInitOptions {
  name?: string;
}

export class Simulation {
  private DEFAULT_AI_MODEL = "openai:gpt-4o-mini";
  private name: string;
  private id: string;
  protected ai: AI | null = null;

  /**
   * Initializes the simulator
   * @param name The name of the simulator
   */
  constructor(options?: SimulationInitOptions) {
    options = options || {};
    this.name = Common.isNullOrUndefined(options.name)
      ? Common.generateRandomName()
      : (options.name as string);
    this.id = uuid();
    Common.validateNameWithError(this.name, "Invalid simulator name");
    this.initAI();
  }

  /**
   * Initializes the AI model for the simulator
   * @returns Promise<void>
   */
  protected async initAI(): Promise<void> {
    this.ai = await AI.getInstance(this.DEFAULT_AI_MODEL);
  }

  /**
   * Returns the name of the simulator
   * @returns The name of the simulator
   */
  public getName(): string {
    return this.name;
  }

  /**
   * Returns the ID of the simulator
   * @returns The ID of the simulator
   */
  public getId(): string {
    return this.id;
  }
}
