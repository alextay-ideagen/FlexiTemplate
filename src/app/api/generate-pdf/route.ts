import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export const maxDuration = 60; // This function can run for a maximum of 60 seconds

export async function POST(req: Request) {
  try {
    const { html } = await req.json();

    if (!html) {
      return new NextResponse('Missing HTML content', { status: 400 });
    }

    // Generate PDF using Puppeteer
    const pdfResponse = await generatePDF(html);
    return pdfResponse;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return new NextResponse('Error generating PDF', { status: 500 });
  }
}

/**
 * Generates a PDF from the provided HTML and returns it as a downloadable file.
 * @param html HTML content to render
 * @returns PDF file as a response
 */
async function generatePDF(html: string) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setContent(html, { waitUntil: 'networkidle0' });

  // Generate the PDF as a buffer
  const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });

  await browser.close();

  // Return the PDF as a downloadable response
  return new NextResponse(pdfBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=document.pdf',
    },
  });
}
