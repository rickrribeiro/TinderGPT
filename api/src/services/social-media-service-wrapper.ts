import { ISocialMediaService } from "./interfaces";

export class SocialMediaServiceWrapper implements ISocialMediaService {
    private service: ISocialMediaService;

    constructor(service: ISocialMediaService) {
        this.service = service;
    }

    async sendMessage(question: string): Promise<string> {
        return await this.service.sendMessage(question);
    }

}
