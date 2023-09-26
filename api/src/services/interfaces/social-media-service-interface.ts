export interface ISocialMediaService {
  sendMessage(session: string, userId: string, message: string): Promise<void>;
  getNewMatches(session: string, minDistance: number, maxDistance: number): Promise<Array<any>>;
  getUserById(session: string, userId: string): Promise<any>;
  getMyBio(session: string): Promise<string>;
  getMessageHistory(session: string, id: string): Promise<Array<any>>
  getMatchesWithUnreadMessages(session: string): Promise<Array<any>>
}
