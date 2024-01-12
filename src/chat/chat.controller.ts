import { Controller, Post, Get, Body } from '@nestjs/common';
import axios from 'axios';

@Controller('chat')
export class ChatController {
  private chatHistory: { type: string; message: string }[] = [];

  @Post('message')
  async sendMessage(@Body() { message }: { message: string }): Promise<string> {
    // User message
    this.chatHistory.push({ type: 'user', message });

    // AI response based on keywords
    const aiResponse = await this.getChatBotResponse(message);

    // AI message
    this.chatHistory.push({ type: 'ai', message: aiResponse });

    return aiResponse;
  }

  @Get('history')
  getChatHistory(): { type: string; message: string }[] {
    return this.chatHistory;
  }

  private async getChatBotResponse(userInput: string): Promise<string> {
    const lowercasedInput = userInput.toLowerCase();

    // keywords and corresponding responses
    const responses = {
      greeting: "Hello! How can I help you today?",
      feeling: "i am doing just fine.., what about you ?",
      inquiry: "I'm sorry, I don't have information on that.",
      farewell: "Goodbye! Have a great day!",
      default: "I didn't understand that. Can you please clarify?",
      weather: "The weather today is sunny.",
      time: `The current time is ${new Date().toLocaleTimeString()}.`,
      joke: "Why don't scientists trust atoms? Because they make up everything!",
    };

    if (lowercasedInput.includes("hello") || lowercasedInput.includes("hi") || lowercasedInput.includes("hi there")) {
      return responses.greeting;
    } else if (
      lowercasedInput.includes("how are you") ||
      lowercasedInput.includes("what's up")
    ) {
      return responses.feeling;
    } else if (
      lowercasedInput.includes("help") ||
      lowercasedInput.includes("assistance")
    ) {
      return responses.inquiry;
    } else if (
      lowercasedInput.includes("bye") ||
      lowercasedInput.includes("goodbye")
    ) {
      return responses.farewell;
    } else if (lowercasedInput.includes("weather")) {
      return responses.weather;
    } else if (lowercasedInput.includes("time")) {
      return responses.time;
    } else if (lowercasedInput.includes("joke")) {
      return responses.joke;
    } else {
      return responses.default;
    }
  }
}
