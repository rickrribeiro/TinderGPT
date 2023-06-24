import express, { Express, Request, Response } from 'express';

import { AIProviderFactory, AIProviderWrapper, SocialMediaFactory, SocialMediaServiceWrapper } from "./services";
import { AIProvidersEnum, SocialMediaEnum } from "./services/enums";
import { TinderClient } from "./services/social_media_services/tinder-client";
// Without provider selection for now because there is only one

const aiProvider: AIProviderWrapper = AIProviderFactory.getAIProvider(
  AIProvidersEnum.CHATGPT
);

const socialMediaService: SocialMediaServiceWrapper = SocialMediaFactory.getSocialMediaService(
  SocialMediaEnum.TINDER
);

const app: Express = express();
const port = 3000;

app.get('/messages/history', async (req: Request, res: Response) => {
  const matches = [{ id: "123" }]; // botar pra pegar da api do tinder
  const tinderClient = new TinderClient();
  let messages = []
  for (let match of matches) {
    let history = await tinderClient.getMessageHistory(match.id);
    messages.push(history);
    console.log(history);
  }
  res.send(messages);
});

app.listen(port, () => {
  console.log(`🔥[TinderGPT]🤖: Server is running at http://localhost:${port}`);
});