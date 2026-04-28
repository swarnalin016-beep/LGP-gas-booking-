import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getAIPrediction(currentWeight: number, history: any[]) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Given an LPG cylinder with ${currentWeight}kg remaining (Max 14.2kg), and a usage history: ${JSON.stringify(history)}, predict in one short sentence how many days are left and the likely refill date. Provide a warning if the weight is below 2kg.`,
      config: {
        systemInstruction: "You are an expert LPG management AI. Provide concise, data-driven predictions in natural language.",
      },
    });
    return response.text || "Prediction currently unavailable.";
  } catch (error) {
    console.error("Gemini Prediction Error:", error);
    return "AI system is offline. Estimated: 5 days remaining.";
  }
}

export async function chatWithBot(history: { role: 'user' | 'model', text: string }[]) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: history.map(h => ({ role: h.role, parts: [{ text: h.text }] })),
      config: {
        systemInstruction: "You are GasGuard AI, a friendly smart LPG assistant. You help users with gas leakage safety, booking refills, and understanding their usage patterns. Keep responses concise and helpful.",
      },
    });
    return response.text || "I'm having trouble connecting to my brain right now.";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "I am currently offline. Please check your internet connection.";
  }
}
