/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */
import { NextResponse } from "next/server";

export async function GET(request, context) {
  const prompt = request.nextUrl.searchParams.get("prompt");
  console.log(prompt);

  const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");

  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };

  async function run() {
    const chatSession = model.startChat({
      generationConfig,
      // safetySettings: Adjust safety settings
      // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [],
    });

    const result = await chatSession.sendMessage("generate the blog 'title' and 'content' in json format for " + prompt + ".the content is use the html tags and tailwindcss' basic class only to decorate text.make sure a content must be a 3000+ words.");
    // console.log(result.response.text()); // this console is run perfectly
    return result.response.text(); // Return the result from the function
  }

  try {
    const responseText = await run(); // Await the result of the run function
    return NextResponse.json({ "json": responseText }); // Send the response back
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'An error occurred' });
  }
}
