import { ISocialMediaService } from "../interfaces/social-media-service-interface";

export class TinderClient implements ISocialMediaService {
  
  private static tinderClient:  TinderClient;  

  public static async getTinderClient(): Promise<TinderClient> {
    if(!this.tinderClient){
      // fazer a auth aq
      // this.tinderClient = auth;
    }
    return this.tinderClient;
  }

  async getNewMatches(): Promise<Array<string>> {
    return ["Token"];
  }

  async sendMessage(matchId: string): Promise<string> {
    return "Token";
  }

  async getMessageHistory(matchId: string): Promise<any> {
    //
    return "Token";
  }
}
