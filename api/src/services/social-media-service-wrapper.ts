import { ISocialMediaService } from "./interfaces";

export class SocialMediaServiceWrapper implements ISocialMediaService {
    private service: ISocialMediaService;

    constructor(service: ISocialMediaService) {
        this.service = service;
    }

    async getMyBio(session: string): Promise<string> {
        return await this.service.getMyBio(session);
    }

    async getUserById(session: string, userId: string): Promise<any> {
        return await this.service.getUserById(session, userId);
    }

    async sendMessage(session: string, question: string): Promise<string> {
        return await this.service.sendMessage(session, question);
    }

    async getNewMatches(session: string): Promise<Array<any>> {
        return await this.service.getNewMatches(session);
    }

}
