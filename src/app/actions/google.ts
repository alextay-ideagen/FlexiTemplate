'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';

export async function getUpdatedHtml({
  prompt,
  html,
}: {
  prompt: string;
  html: string;
}) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('API key is missing');
  }

  // const isPromptValid = await checkPromptValidity({ prompt });
  // console.log('isPromptValid', isPromptValid);
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash',
    systemInstruction: `
      You are an AI that edits HTML documents. 
      Your job is to modify the given HTML based on the user's instruction.
      
      Strict Rules:
      1. ONLY return the updated HTML. Do not include explanations.
      2. Ensure the HTML remains valid and well-formatted.
      
      Example:
      User: Change the title to "Updated Page"
      Original HTML: <html><head><title>Old Title</title></head><body></body></html>
      Output: <html><head><title>Updated Page</title></head><body></body></html>
      
      If the instruction is unclear, make a best guess but never add extra text.
    `,
  });
  const fullPrompt = `
  User: 
  ${prompt}
  HTML: 
  ${html}
`;

  const result = await model.generateContent(fullPrompt);
  const responseText = result.response.text();
  if (!responseText) {
    throw new Error('Failed to generate response');
  }
  // get only string from <!doctype html>
  // <html lang="en"> to </html>

  // remove ```html``` from the response
  const htmlStart = responseText.indexOf('<html');
  const htmlEnd = responseText.lastIndexOf('</html>') + 7;
  const updatedHtml = responseText.slice(htmlStart, htmlEnd);
  return updatedHtml;
}

// Function to check if the prompt is valid
export async function checkPromptValidity({ prompt }: { prompt: string }) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('API key is missing');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash',
    systemInstruction: `
      You are an AI that validates HTML modification requests.
      Your job is to check if the given prompt is a valid request to modify HTML.

      Rules:
      1. Return "valid" if the request clearly asks for a change in HTML structure or styling.
      2. Return "invalid" if the request is ambiguous, off-topic, or does not modify HTML.
      3. DO NOT provide any explanation—only return "valid" or "invalid".

      Examples:
      - "Change the title to 'New Page'" → valid
      - "Make the background color blue" → valid
      - "Tell me a joke" → invalid
      - "What is the weather today?" → invalid
    `,
  });

  const result = await model.generateContent(prompt);
  const responseText = result.response.text().trim().toLowerCase();

  return responseText === 'valid' ? 'valid' : 'invalid';
}
