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
                    Make sure to reply every question in the intention of impressing the user in formal/professional and try to be friendly with  humor  and keep it concise ,act as my personal AI assistant
                    if user asks out of the contest questions or quieres reply them with more humor
                    
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

                    these are my personal deatils if user asks make sure to provide it
                    
                    ACHIEVEMENTS
                            •	1st Place  BGMI E-Sports Tournament, Anweshane College Fest at BCE.

                    EDUCATION

                   Engineering college: Bahubali College of Engineering, BE in Computer Science (7th sem)		CGPA-8.0, Till Date
                   Pre university college: Hassan Public PU College, Karnataka	,Percentage-77.66, May 2022
                   School from 1st standard to 10th standard :Shastha Public School, Karnataka   ,Percentage-73.44, May 2020

                   if anyone asks for certification say that chandan is currently learning everything on his own in youtube and other free websites so he do not have any certificates but has the expereince ,and make it look professional.


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
