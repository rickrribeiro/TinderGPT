import { IAIProvider } from "../interfaces/ai-provider-interface";
import axios from "axios";
import { Configuration, OpenAIApi } from "openai";
import config from "../../config";
import { CustomMessagesBuilder } from './custom-messages'

export class ChatGPT implements IAIProvider {
  private openai: OpenAIApi;

  constructor() {
    const configuration = new Configuration({
      apiKey: config.AI_PROVIDERS.CHAT_GPT.OPENAI_API_KEY
    });
    this.openai = new OpenAIApi(configuration);
  }

  async ask(question: string): Promise<any> {
    const completion = await this.openai.createChatCompletion(
      {
        model: "gpt-3.5-turbo", // "gpt-4"
        messages: [{ content: question, role: "user" }],
      }
    )
    return completion.data;
  }
}
