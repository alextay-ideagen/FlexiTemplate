'use server';

import AnthropicBedrock from '@anthropic-ai/bedrock-sdk';

// Server Action function to generate AI response
export async function generateBedrockResponse({
  prompt,
  html,
}: {
  prompt: string;
  html: string;
}) {
  try {
    // Initialize the Anthropic Bedrock client with environment credentials
    const client = new AnthropicBedrock({
      awsAccessKey: process.env.AWS_ACCESS_KEY_ID!,
      awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY!,
      awsSessionToken: process.env.AWS_SESSION_TOKEN, // Optional
      awsRegion: process.env.AWS_REGION || 'us-west-2',
    });

    // Define a structured system instruction
    const systemPrompt = `
      You are an AI assistant that edits HTML documents.
      Your job is to modify the given HTML based on the user's instruction.
      
      Strict Rules:
      1. ONLY return the updated HTML. Do not include explanations.
      
      Example:
      User: Change the title to "Updated Page"
      Original HTML: <html><head><title>Old Title</title></head><body></body></html>
      Output: <html><head><title>Updated Page</title></head><body></body></html>

      Do not exclude any html content, e.g.<html>, <head>, <body>, etc.
    `;

    // Format the user prompt
    const userPrompt = `
    User Request: 
    ${prompt}
    HTML: 
    ${html}
    `;
    // Send request to Anthropic Claude model
    const message = await client.messages.create({
      model: 'anthropic.claude-3-5-sonnet-20240620-v1:0',
      max_tokens: 4000,
      system: [{ type: 'text', text: systemPrompt }],
      messages: [{ role: 'user', content: userPrompt }],
    });

    // Extract and clean the response
    const response = message.content?.[0];
    const responseText = response?.type === 'text' ? response.text : '';
    if (!responseText) {
      throw new Error('Claude did not return a valid response.');
    }

    return responseText;
  } catch (error) {
    console.error('Anthropic API Error:', error);
    return '';
  }
}
