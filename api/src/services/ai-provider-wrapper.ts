import { IAIProvider } from "./interfaces/ai-provider-interface";

export class AIProviderWrapper implements IAIProvider {
  private provider: IAIProvider;

  constructor(provider: IAIProvider) {
    this.provider = provider;
  }

  async ask(question: string): Promise<string> {
    return await this.provider.ask(question);
  }

  async listModels() {
    return await this.provider.listModels();
  }
}
