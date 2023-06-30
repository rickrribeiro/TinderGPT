import { ISocialMediaService } from "./interfaces";

export class SocialMediaServiceWrapper implements ISocialMediaService {
    private service: ISocialMediaService;

    constructor(service: ISocialMediaService) {
        this.service = service;
    }

    async getMatchesWithUnreadMessages(session: string): Promise<any[]> {
        return await this.service.getMatchesWithUnreadMessages(session);
    }
    async getMessageHistory(session: string, id: string): Promise<any[]> {
        return await this.service.getMessageHistory(session, id);
    }

    async getMyBio(session: string): Promise<string> {
        return await this.service.getMyBio(session);
    }

    async getUserById(session: string, userId: string): Promise<any> {
        return await this.service.getUserById(session, userId);
    }

    async sendMessage(session: string, userId: string, message: string): Promise<void> {
        return await this.service.sendMessage(session, userId, message);
    }

    async getNewMatches(session: string): Promise<Array<any>> {
        return await this.service.getNewMatches(session);
    }

}
