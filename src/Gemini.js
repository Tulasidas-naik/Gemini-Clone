
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyBcTZc1Me9wT1kyzgoae6BYZDfv-O6HIOc" });

async function main(input) {
  console.log(input, "//////////////", JSON.stringify(input))
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: JSON.stringify(input),
  });
  console.log(response.text);
  return response.text;
}

export default main;