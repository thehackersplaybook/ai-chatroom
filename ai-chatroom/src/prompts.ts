class ChatSimulationPrompts {
  public static readonly generateDescription = (
    prompt: string
  ) => `Generate a short description for a chatroom simulation where AI agents talk to each other.
          I will give you the 'prompt' for the simulation which briefly describes the simulation. 
          Give a 2 to 5 line description of the simulation.
          Respond only with the description and do not include anything else. 
          Prompt: ${prompt}`;
}

export class Prompts {
  public static readonly chatSimulation = {
    generateDescription: ChatSimulationPrompts.generateDescription,
  };
}
