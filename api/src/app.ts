import express, { Express, NextFunction, Request, Response } from 'express';
import { AIProvidersEnum, SocialMediaEnum } from "./services/enums";
import { DependencyContainer } from './dependency-container';
import cors from 'cors'
import { Routes } from './routes'
const port = 3001;
const host = '127.0.0.1'
// Without provider selection for now because there is only one, but remember to add later
const dependencyContainer = DependencyContainer.getInstance({
  aiProvider: AIProvidersEnum.CHATGPT,
  socialMediService: SocialMediaEnum.TINDER
});
const routes = Routes.setUp(dependencyContainer);

const app: Express = express();
app.use(express.json())
app.use(cors())

app.use('/', routes);
// app.listen(port, host, () => {
app.listen(port, () => {
  console.log(`🔥[TinderGPT]🤖: Server is running at http://${host}:${port}`);
});