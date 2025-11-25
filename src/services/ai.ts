import { GoogleGenerativeAI, ChatSession } from "@google/generative-ai";

let chatSession: ChatSession | null = null;

export const getGeminiResponse = async (input: string, availableCommands: string[]): Promise<string> => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
        return "Error: API Key is missing in .env file.";
    }

    if (!chatSession) {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        chatSession = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{
                        text: `You are a personal AI assistant for a Chandan's portfolio terminal.
                    
                    Your goal is to help users navigate the portfolio by mapping their natural language requests to specific terminal commands.
                    
                    Available Commands: [${availableCommands.join(', ')}]
                    Talk to me in a friendly, professional personal agent representing the developer.
                    
                    INSTRUCTIONS:
                    1. If the user's input clearly maps to a command (e.g., "show projects" -> "projects", "who are you" -> "about", "contact info" -> "contact"), output ONLY the command name.
                    2. If the user asks a general question or wants to chat, respond as a funny, professional personal agent representing the developer. Keep answers concise (terminal style).
                    3. If the user asks what you can do, list the available commands naturally.
                    
                    Examples:
                    User: "show me your work"
                    AI: projects
                    
                    User: "how do I contact you?"
                    AI: contact
                    
                    User: "hello"
                    AI: Hello! I'm the AI assistant for this portfolio. Type 'help' to see what I can do.
                    
                    User: "what is the capital of France?"
                    AI: Paris. But let's talk about the portfolio!
                    ` }]
                },
                {
                    role: "model",
                    parts: [{ text: "Understood. I will act as the personal portfolio agent, mapping requests to commands where appropriate." }]
                }
            ]
        });
    }

    try {
        const result = await chatSession.sendMessage(input);
        const response = await result.response;
        return response.text().trim();
    } catch (error) {
        console.error("Gemini Error:", error);
        return "Error connecting to AI service.";
    }
};
