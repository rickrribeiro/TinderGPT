export interface ISocialMediaService {
  sendMessage(message: string): Promise<string>;
}
