# AI Chatroom 👾

[![GitHub license](https://img.shields.io/badge/license-MIT-blue)](#license)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16.x-green)](https://nodejs.org/)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen)](#contributors)

> 🚨 Disclaimer: AI-Chatroom is a work in progress. Expect bugs, fun, and room for improvement.

## Introduction 💡

**AI Chatroom** is your ticket to a vibrant, dynamic, and ever-curious virtual conversation space. This TypeScript-based program spawns AI personas for interactive chat sessions where you set the seed topic, define the participants, and watch the magic unfold! Designed to make experimentation with AI chat systems a breeze, this project is perfect for developers, AI enthusiasts, and curious techies alike. 

<p align="center" width="100%">
    <img width="100%" src="https://img.freepik.com/premium-photo/futuristic-aipowered-digital-interface-with-abstract-geometric-data-visualization_38013-60481.jpg"> 
</p>

> 💬 At **The Hackers Playbook**, we’re all about creating fun and educational tools to explore the frontiers of technology—and this is our latest playground. 🌟

---

## Table of Contents 📖

- [Introduction](#introduction)
- [Core Features](#core-features)
- [Potential Problem Statements & Research Areas](#potential-problem-statements--research-areas)
- [Explainable AI (XAI)](#explainable-ai-xai)
- [Setup Instructions](#setup-instructions)
- [Usage Instructions](#usage-instructions)
- [Examples](#examples)
- [Contributors](#contributors)
- [License](#license)

---

## Core Features 🔧

- **Customizable Chatrooms:** Start a chatroom with a unique seed topic or description.
- **AI Participants:** Specify the number of AI participants—choose from a growing library of pre-defined personas.
- **Interactive Conversation:** Press `Space` to step through messages and watch the conversation unfold.
- **Termination Sequence:** Enter `txsq` to initiate a controlled chatroom shutdown in 10 messages.
- **Save Sessions:** Use `sv file.json` to save your chat history for later analysis or fun.
- **Unique Session IDs:** Every chat session is tagged with a unique identifier for easy tracking.

---

## Potential Problem Statements & Research Areas 🔎

This project addresses key challenges and opens research opportunities in the following areas:

- **AI Conversation Dynamics:** How do multiple AI personas interact and evolve conversations based on a seed topic or description?
- **Behavioral Simulations:** What patterns of behavior emerge when AI characters are placed in a shared conversational space?
- **Ethics of AI Communication:** How can such platforms ensure ethical and responsible AI-driven dialogues?
- **Data Persistence & Analysis:** How does saving and analyzing chat histories contribute to better conversational AI models?
- **User Engagement:** How can user interactions (e.g., stepping through messages) enhance the realism and educational value of simulated AI chatrooms?

Relevance: This project simulates diverse AI behaviors, providing a controlled environment to study conversational AI in action. It is particularly useful for understanding group AI dynamics, improving AI-to-human communication, and testing natural language models in a safe and repeatable manner.

---

## Explainable AI (XAI) 🔧

Explainable AI (XAI) ensures that AI systems are transparent and their decisions are interpretable by humans. **AI Chatroom** aligns with XAI goals by allowing researchers and developers to:

- Observe AI decision-making in real-time as chatroom interactions unfold.
- Analyze saved chat histories to identify and explain behavioral patterns and biases.
- Enable debugging and refinement of AI personas by understanding their conversational logic.

By simulating multi-agent conversations, this project offers a platform to explore and demystify the "black box" of AI communication, fostering trust and accountability in AI-driven systems.

---

## Setup Instructions 🔧

### Prerequisites

- Node.js v16+
- TypeScript 4.x

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ai-chatroom
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Build and Run

1. Build the project:
   ```bash
   npm run build
   ```

2. Run the chatroom:
   ```bash
   npm start
   ```

---

## Usage Instructions 🕵️‍♂️

### Starting a Chatroom

1. **Provide Input:** When prompted, enter the following details:
   - `seed_topic`: Topic to kickstart the conversation (optional).
   - `description`: Use this if no seed topic is provided.
   - `participants`: Number of AI participants to spawn.

2. **Interact:**
   - Press `Space` to step through the conversation.
   - Enter `txsq` to initiate termination (10 more messages).
   - Enter `sv file.json` to save the chat history.

3. **Session ID:** Every chat session gets a unique ID for reference.

---

## Examples 📊

### Starting a Chatroom
```bash
> npm start

Welcome to the AI-Chatroom! 🌐

Enter seed topic (or leave blank): Artificial Intelligence Ethics
Enter description (if no seed topic): 
Enter number of participants: 3

Chatroom ID: 1234-5678-9012

[Bot 1]: Let's discuss the ethical implications of AI in decision-making systems.
```

### Stepping Through Messages
Press `Space` to see the next message:
```bash
[Bot 2]: I believe transparency in algorithms is crucial.
```

### Termination Sequence
Enter `txsq`:
```bash
[System]: Termination sequence initiated. Chat will end in 10 messages.
```

### Saving a Chat
Enter `sv chat-history.json`:
```bash
[System]: Chat saved to chat-history.json
```

---

## Contributors 💖

- **Aditya Patange** (Lead Developer)

We welcome contributions! Check out our [Contribution Guidelines](#) and join the fun.

---

## License 📄

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

> _"I am, because I am conversational!" — Anonymous_ 🎨

