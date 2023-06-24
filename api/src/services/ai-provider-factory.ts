import { AIProviderWrapper } from "./ai-provider-wrapper";
import { AIProvidersEnum } from "./enums/ai-providers-enum";
import { ChatGPT } from "./ai_providers";

export class AIProviderFactory {
  static getAIProvider(providerName: AIProvidersEnum): AIProviderWrapper {
    let provider;
    if (providerName === AIProvidersEnum.CHATGPT) {
      provider = ChatGPT;
    } else {
      provider = ChatGPT; // DEFAULT
    }
    return new AIProviderWrapper(new provider());
  }
}
