import { NextResponse } from 'next/server';
import * as puppeteer from 'puppeteer';

import chromium from '@sparticuz/chromium';
import puppeteerCore from 'puppeteer-core';
import type { Browser } from 'puppeteer-core';

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
  let browser: puppeteer.Browser | Browser;

  if (process.env.NODE_ENV === 'production') {
    browser = await puppeteerCore.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });
  } else {
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: true,
    });
  }

  if (!browser) {
    throw new Error('Failed to launch browser');
  }
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
