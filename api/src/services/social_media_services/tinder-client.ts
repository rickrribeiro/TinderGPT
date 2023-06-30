import axios from 'axios';
import { ISocialMediaService, ITinderMatchResponse } from "../interfaces";
import config from '../../config'
export class TinderClient implements ISocialMediaService {
  private static tinderClient: TinderClient;
  private baseUrl = config.SOCIAL_MEDIA_SERVICES.TINDER.url;
  private defaultHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }

  public async getMyBio(session: string): Promise<string> {
    const url = this.baseUrl + '/v2/profile?locale=en&include=user'
    const res = await axios.get(url, { headers: { ...this.defaultHeaders, "x-auth-token": session } });
    const user: string = res.data.data.user.bio
    // console.log(res.data.data.user.bio);
    return user;
  }

  // TODO - mudar de singleton pra normal mesmo qnd adicionar a auth
  public static async getTinderClient(): Promise<TinderClient> {
    if (!this.tinderClient) {
      this.tinderClient = new TinderClient()
    }
    return this.tinderClient;
  }

  async getNewMatches(session: string): Promise<any> { // Array<ITinderMatchResponse>
    const url = this.baseUrl + '/v2/matches?locale=en&count=11&message=0&is_tinder_u=false'
    try {
      const res = await axios.get(url, { headers: { ...this.defaultHeaders, "x-auth-token": session } });
      const newMatches: Array<ITinderMatchResponse> = res.data.data.matches.map((el: any) => {
        return {
          id: el.person._id,
          name: el.person.name,
          photoUrl: el.person.photos[0].url,
          bio: el.person.bio
        }
      });
      // const matchesNames = newMatches.map((el) => el.person.name)
      return newMatches;
    } catch (err) {
      console.log((err as any).message)
      return []
    }


  }

  async getUserById(session: string, userId: string): Promise<any> {
    const url = this.baseUrl + `/user/${userId}?locale=en`
    const res = await axios.get(url, { headers: { ...this.defaultHeaders, "x-auth-token": session } });
    const user: Array<ITinderMatchResponse> = res.data.results
    return user;
  }

  async sendMessage(session: string, matchId: string): Promise<string> {
    return "Token";
  }

  async getMessageHistory(session: string, matchId: string): Promise<any> {
    //
    return "Token";
  }

  async auth(facebook_token: string, facebook_id: string): Promise<string> {
    /* 
    TODO - Não implementado pois meu tinder não ta conectado no face
    adicionando manualmente o session, mas implementar depois
    */
    const token = await axios.post(this.baseUrl, { facebook_id, facebook_token }, { headers: this.defaultHeaders });
    return token.data
  }



}
