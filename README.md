# Project Description

This project is designed to provide a user-friendly interface for editing the styling of documents using AI language models (LLMs). It leverages the power of Next.js, Tailwind CSS, TypeScript, and advanced AI capabilities to create a robust and scalable application. Users can customize various aspects of document styling through an intuitive panel, making it easy to apply consistent and visually appealing designs with the assistance of AI.

Key features include:

- Real-time preview of document styling changes
- AI-powered suggestions for styling improvements
- Customizable themes and styles
- Easy-to-use interface for non-technical users
- Integration with modern web technologies for optimal performance

![Simple Flowchart Infographic Graph](https://github.com/user-attachments/assets/c125a200-0a8d-40c9-8109-a7054bd1d702)


## Problem Statements
The Administrator setting-up and using their PolicyConnect site is experiencing the pain point of not being able to easily change the content provided by CompliSpace.

This is causing inconvenience and acting as a barrier to their goal. They have to manually update all pages with their own tone, style, etc., and they also lose updates from CompliSpace when they convert to UGC.

This limitation is impacting their ability to customize the content to better suit their needs and get the most out of their subscription.


## Project Aim
This project aims to simplify the process of document styling, enabling users to create professional-looking documents with minimal effort and enhanced by AI-driven insights.


## Project Objectives
1. Develop features that allow users to easily modify and personalize content provided by CompliSpace, ensuring it aligns with their unique tone and style.
2. Implement an automated system to seamlessly integrate updates from CompliSpace into user-generated content (UGC), minimizing manual effort and ensuring consistency.
3. Design an intuitive interface that simplifies the editing process, making it easier for users to manage and customize their documents efficiently.


## Importances
1. By automating content updates and simplifying the editing process, Document Stylist significantly reduces the time and effort required to manage and customize documents. This allows users to focus more on their core tasks and less on manual updates, leading to enhanced productivity.
2. With features that enable easy customization and integration of updates, users can ensure that their documents consistently reflect their unique tone and style. This not only improves the relevance of the content but also maintains consistency across all documents, which is crucial for effective communication and branding.


## How is this Solution Innovative
- Utilising AI to analyse existing documents to extract and define an organisation’s unique style is a sophisticated use of technology. It moves beyond traditional manual methods of content analysis and style guide creation, offering a more efficient and precise way to capture the essence of organisational communication.
- The concept of applying a 'style mask' to content is particularly innovative. Similar to how filters work in digital photography and social media, this mask overlays predefined style elements onto any document content. This ensures consistency and compliance without altering the underlying base content, which can continue to receive updates without disruption.
- The ability to apply this style uniformly across all documents or selectively, combined with the capability to automatically update documents with new content while retaining the organisational style, provides significant scalability and flexibility. This is crucial for organisations that need to maintain a strong brand identity across diverse and frequently updated content.
- The system’s design to accommodate future updates seamlessly and ensure all new and updated content conforms to the established style without additional intervention is forward-thinking. It not only saves time but also reduces the workload on content managers.


## Future Enhancement
1. Focus on improving the AI capabilities of the Document Stylist to auto-suggest style adaptations based on emerging trends and regulatory changes. This proactive approach will ensure that the organisation’s documentation is not only consistent but also dynamically aligned with industry standards.


## Installation
To get started with this project, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone git@github.com:alextay-ideagen/FlexiTemplate.git
   cd FlexiTemplate
   ```

2. **Install the dependencies**:

   ```bash
   npm install
   ```

3. **Create an environment file**:
   Create a `.env` file in the root directory of the project and add your Gemini API key:

   ```plaintext
   GEMINI_API_KEY=insert_your_API_key
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

This will start the Next.js development server on `http://localhost:3000`.

## Usage

To use the document styling editor, follow these steps:

1. **Navigate to the Dashboard**:
   Open your browser and go to `http://localhost:3000`. Click on the "Dashboard" link in the navigation menu.

2. **Select a Document**:
   In the dashboard, click on the first item, such as "Access Policy".

3. **Edit Document Styling**:
   You will be presented with an interface to edit the document. Provide input to customize the document's font size, color, and any other custom styling. Use the AI-powered suggestions to enhance your styling choices.

4. **Export to PDF**:
   Export to PDF once document is ready

This intuitive interface allows you to easily customize document styles with the help of AI-driven insights.
