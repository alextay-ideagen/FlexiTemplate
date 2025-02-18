'use server';

import puppeteer from 'puppeteer';
import { NextResponse } from 'next/server';

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
  // get only string from <!doctype html>
  // <html lang="en"> to </html>
  const extractedHtml = responseText.match(
    /<!doctype html>[\s\S]*<\/html>/g,
  )[0];
  return extractedHtml;
}

export async function checkPromptValidity({ prompt }: { prompt: string }) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
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
  const result = await model.generateContent(prompt);
  const responseText = result.response.text();
  // get only string from <!doctype html>
  // <html lang="en"> to </html>
  const extractedHtml = responseText.match(
    /<!doctype html>[\s\S]*<\/html>/g,
  )[0];
  return extractedHtml;
}
