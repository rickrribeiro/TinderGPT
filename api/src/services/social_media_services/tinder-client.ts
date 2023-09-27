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

  public static async getTinderClient(): Promise<TinderClient> {
    if (!this.tinderClient) {
      this.tinderClient = new TinderClient()
    }
    return this.tinderClient;
  }

  async getMatchesWithUnreadMessages(session: string): Promise<any[]> {
    const url = this.baseUrl + '/v2/matches?locale=en&count=100&message=1&is_tinder_u=false'
    try {

      const res = await axios.get(url, { headers: { ...this.defaultHeaders, "x-auth-token": session } });
      const newMatches: Array<ITinderMatchResponse> = res.data.data.matches.filter((el: any) => el.messages[0].from != config.SOCIAL_MEDIA_SERVICES.TINDER.USER_ID).map((el: any) => {
        return {
          id: el.person._id,
          name: el.person.name,
          photoUrl: el.person.photos[0].url
        }
      });
      // const matchesNames = newMatches.map((el) => el.person.name)
      return newMatches;
    } catch (err) {
      console.log((err as any).message)
      return []
    }
  }


  async getMessageHistory(session: string, id: string): Promise<any> {//
    const url = this.baseUrl + `/v2/matches/${id}/messages?locale=en&count=100`
    // const url = this.baseUrl + `/v2/matches/5d1038b6261c7c1500155c2063f94fcf7c2cdf0100e0bf84/messages?locale=en&count=100`
    try {
      const res = await axios.get(url, { headers: { ...this.defaultHeaders, "x-auth-token": session } });
      const messages: Array<ITinderMatchResponse> = res.data.data.messages.map((el: any) => {
        const isUserMessage = el.from != id.replace(config.SOCIAL_MEDIA_SERVICES.TINDER.USER_ID, '') ? true : false;// '63f94fcf7c2cdf0100e0bf84'
        return {
          message: el.message,
          isUserMessage: isUserMessage
        }
      });
      return messages.reverse();
    } catch (err) {
      console.log((err as any).message)
      return []
    }
  }
  // todo - chang has bio to be true, false or undefined
  // todo change brazilian filter to be true, false or undefined and add variable 
  async getNewMatches(session: string, minDistance = 0, maxDistance = 99999, hasBio = true): Promise<any> { // Array<ITinderMatchResponse>
    const url = this.baseUrl + '/v2/matches?locale=en&count=100&message=0&is_tinder_u=false'

    try {
      const res = await axios.get(url, { headers: { ...this.defaultHeaders, "x-auth-token": session } });
      const newMatches: Array<any> = [];
      for (const match of res.data.data.matches) {
        await new Promise((resolve) => {
          setTimeout(resolve, 10);
        });
        const user = await this.getUserById(session, match.person._id);
        const distanceKm = user.distance_mi * 1.60934;
        let shouldSkip = false;
        if (!hasBio && user.bio && user.bio.length > 0) {
          shouldSkip = true;
        } else if (hasBio && user.bio && user.bio.length === 0) {
          shouldSkip = true;
        }
        // if (!user.bio.includes("🇧🇷")) {
        //   shouldSkip = true
        // }
        //todo - move o distance para o padrãod o should skip e limpar o codigo
        if (distanceKm > minDistance && distanceKm < maxDistance && !shouldSkip) {
          newMatches.push({
            id: match.person._id,
            name: match.person.name,
            photoUrl: match.person.photos[0].url,
            bio: match.person.bio,
            distance: distanceKm
          })
        }
      };
      // const matchesNames = newMatches.map((el) => el.person.name)
      return newMatches;
    } catch (err) {
      console.log((err as any).message)
      return []
    }


  }


  public async getMyBio(session: string): Promise<string> {
    const url = this.baseUrl + '/v2/profile?locale=en&include=user'
    const res = await axios.get(url, { headers: { ...this.defaultHeaders, "x-auth-token": session } });
    const bio: string = res.data.data.user.bio
    // console.log(res.data.data.user.bio);
    // return bio;
    return "Amo viajar, tomar cerveja, jogos online, ler e sair para conhecer lugares novos!"
  }


  async getUserById(session: string, userId: string): Promise<any> {
    const url = this.baseUrl + `/user/${userId}?locale=en`
    const res = await axios.get(url, { headers: { ...this.defaultHeaders, "x-auth-token": session } });
    const user: Array<ITinderMatchResponse> = res.data.results
    return user;
  }

  async sendMessage(session: string, matchId: string, message: string): Promise<void> {
    //  const matchId = '62939d6598c12601004e17d363f94fcf7c2cdf0100e0bf84';

    const url = this.baseUrl + `/user/matches/${matchId}?locale=en`
    const payload = {
      "message": message
    }
    await axios.post(url, payload, { headers: { ...this.defaultHeaders, "x-auth-token": session } });
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
