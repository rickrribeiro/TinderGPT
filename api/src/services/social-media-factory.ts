import { SocialMediaServiceWrapper } from "./social-media-service-wrapper";
import { SocialMediaEnum } from "./enums";
import { TinderClient } from "./social_media_services";

export class SocialMediaFactory {
    static getSocialMediaService(serviceName: SocialMediaEnum): SocialMediaServiceWrapper {
        let service;
        if (serviceName === SocialMediaEnum.TINDER) {
            service = TinderClient;
        } else {
            service = TinderClient; // DEFAULT
        }
        return new SocialMediaServiceWrapper(new service());
    }
}
