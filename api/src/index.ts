import { AIProviderFactory } from "./services/ai-provider-factory";
import { AIProviderWrapper } from "./services/ai-provider-wrapper";
import { AIProvidersEnum } from "./services/enums/ai-providers-enum";
import { TinderClient } from "./services/social_media_services/tinder-client";
// Without provider selection for now because there is only one

const provider: AIProviderWrapper = AIProviderFactory.getAIProvider(
  AIProvidersEnum.CHATGPT
);

export const app = async () => {
  const matches = [{ id: "123" }]; // botar pra pegar da api do tinder
  const tinderClient = new TinderClient();
  for (let match of matches) {
    let history = await tinderClient.getMessageHistory(match.id);
    console.log(history);
  }
};

app();
