import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key (from environment variable)
const apiKey = import.meta.env.VITE_GOOGLE_API_KEY || 
  import.meta.env.GOOGLE_API_KEY;

if (!apiKey) {
  throw new Error("Missing Google API key");
}

// Initialize the Google Generative AI SDK
const genAI = new GoogleGenerativeAI(apiKey);

// Create a Gemini model instance with the specific model name
export const geminiModel = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash" 
});

// Generate a response using the Gemini model
export async function generateAIResponse(prompt: string, healthContext?: string) {
  try {
    // Include health records context if available
    const fullPrompt = healthContext 
      ? `${prompt}\n\nHealth records context: ${healthContext}` 
      : prompt;
    
    const result = await geminiModel.generateContent(fullPrompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating AI response:", error);
    return "I'm sorry, I encountered an error processing your request. Please try again later.";
  }
}