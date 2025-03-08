"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIClient = void 0;
const generative_ai_1 = require("@google/generative-ai");
class AIClient {
    static genAI;
    static getGeminiClient() {
        if (!AIClient.genAI) {
            const apiKey = process.env.GEMINI_API_KEY;
            if (!apiKey) {
                throw new Error("GEMINI_API_KEY no está configurada en las variables de entorno.");
            }
            AIClient.genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
        }
        return AIClient.genAI;
    }
    static async getAnalysis(description) {
        const gemini = AIClient.getGeminiClient();
        const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `Eres un experto en análisis del ciclo de vida de productos de consumo. Analiza la siguiente descripción y responde ÚNICAMENTE con un objeto JSON válido. No incluyas texto antes o después del JSON.

Descripción del producto: "${description}"

Basado en la descripción, proporciona estimaciones razonables para un producto de esa categoría.

La estructura del JSON debe ser la siguiente:
{
  "productTitle": "Un nombre corto y descriptivo para el producto",
  "estimatedCarbonFootprintKg": <número>,
  "estimatedWaterUsageLiters": <número>,
  "materialsAnalysis": [
    { "materialName": "string", "sustainabilityScore": <número del 1 al 10>, "notes": "Breve justificación de la puntuación." }
  ],
  "endOfLife": { "recyclable": <boolean>, "notes": "Notas sobre la reciclabilidad." },
  "overallSummary": "Un resumen de 2-3 frases sobre el impacto general del producto."
}
`;
        try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            // Intentar parsear el JSON. A veces Gemini puede incluir texto extra.
            const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
            let jsonString = text;
            if (jsonMatch && jsonMatch[1]) {
                jsonString = jsonMatch[1];
            }
            const parsedResponse = JSON.parse(jsonString);
            return parsedResponse;
        }
        catch (error) {
            console.error("Error al llamar a la API de Gemini o al parsear la respuesta:", error);
            throw new Error("No se pudo obtener el análisis del producto. Inténtalo de nuevo más tarde.");
        }
    }
}
exports.AIClient = AIClient;
//# sourceMappingURL=ai.client.js.map