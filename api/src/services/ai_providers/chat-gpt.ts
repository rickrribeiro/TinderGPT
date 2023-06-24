import { IAIProvider } from "../interfaces/ai-provider-interface";
import axios from "axios";
import { Configuration, OpenAIApi } from "openai";
import config from "../../config/config";
import { CustomMessagesBuilder } from './custom-messages'

export class ChatGPT implements IAIProvider {
  private openai: OpenAIApi;

  constructor() {
    const configuration = new Configuration({
      organization: "tinderBOT",
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(configuration);
  }


  async listModels() {
    return await this.openai.listModels();
  }

  async ask(question: string): Promise<string> {
    const messageBuilder = new CustomMessagesBuilder();
    const formatedQuestion = messageBuilder.historyBasedMessage(question, "");
    const data = await axios.get(config.AI_PROVIDERS.CHAT_GPT.url + ``, {
      headers: {
        Accept: "application/json",
        "OpenAI-Organization": config.AI_PROVIDERS.CHAT_GPT.organizationId,
        Authorization: `Bearer ${config.AI_PROVIDERS.CHAT_GPT.OPENAI_API_KEY}`,
      },
    });
    return data.data;
    return "aaa";
  }
}
