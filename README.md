# Axle AI Chat and Image Generator (Built with Gemini AI)

This feature lets users chat with AI and also generate images from text prompts using Gemini AI. It provides a smooth and engaging experience for users.

You can test it here:  
**[Try TalkAxle here](https://talkaxle.netlify.app/)**


## Features I Implemented

### 1. Chat and Image Modes
Users can switch between:
- Chat mode – to type and get smart replies from the AI.
- Image mode – to type descriptions and get AI-generated images.

### 2. Real-Time Responses (Streaming)
- AI replies are streamed live, so users see them as they are being typed.
- While the AI is responding, the screen automatically scrolls to the latest message.

### 3. Loading State
- When the AI is generating a response or image, a loading indicator shows.
- This gives feedback to the user that the system is processing their request.

### 4. Limited AI Memory (10 Messages)
- The AI only remembers the last 10 messages to avoid overload.
- This keeps the conversation lightweight and focused.

### 5. Input Reset and Auto Scroll
- After a message is sent:
  - The input field is cleared immediately.
  - The screen scrolls down to show the latest message or reply.

## Tools and Technologies Used
- Gemini AI – for handling both chat and image generation.
- React – for managing the user interface and component states.
- Async/Await – to handle waiting for AI responses.
- State Management – to track messages and loading states.

## Summary
This system allows users on Axle to:
- Chat with an AI in real-time.
- Generate images from text.
- Enjoy a fast, clean, and responsive experience.
