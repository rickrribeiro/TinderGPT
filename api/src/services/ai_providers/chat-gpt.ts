import { IAIProvider } from "../interfaces/ai-provider-interface";
import axios from "axios";
import { Configuration, OpenAIApi } from "openai";
import config from "../../config/config";

export class ChatGPT implements IAIProvider {
  private openai: OpenAIApi;

  constructor() {
    const configuration = new Configuration({
      organization: "tinderBOT",
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(configuration);
  }

  formatMessage(message: string, history: string) {
    /*
     * Outras Possibilidades: mandar o historico de msgs, mandar lista de tópicos
     */
    //const response = await openai.listEngines();
    return `
        Quero que você gere sugestões de respostas para as seguintes mensagens ${config.BASE_MESSAGE} do   Tinder tomando como base minha descrição e o histórico da conversa.   
        Descrição: "${config.BASE_MESSAGE}".
        Histórico: "${history}". 
        Responda a seguinte mensagem como se fosse eu:
        "${message}"
        `;
  }

  async listModels() {
    return await this.openai.listModels();
  }

  async ask(question: string): Promise<string> {
    const formatedQuestion = this.formatMessage(question, "");
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
