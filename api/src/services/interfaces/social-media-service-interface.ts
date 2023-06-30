export interface ISocialMediaService {
  sendMessage(session: string, message: string): Promise<string>;
  getNewMatches(session: string): Promise<Array<any>>;
  getUserById(session: string, userId: string): Promise<any>;
  getMyBio(session: string): Promise<string>;
}
