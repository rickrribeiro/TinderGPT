"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialMediaFactory = void 0;
const social_media_service_wrapper_1 = require("./social-media-service-wrapper");
const enums_1 = require("./enums");
const social_media_services_1 = require("./social_media_services");
class SocialMediaFactory {
    static getSocialMediaService(serviceName) {
        let service;
        if (serviceName === enums_1.SocialMediaEnum.TINDER) {
            service = social_media_services_1.TinderClient;
        }
        else {
            service = social_media_services_1.TinderClient; // DEFAULT
        }
        return new social_media_service_wrapper_1.SocialMediaServiceWrapper(new service());
    }
}
exports.SocialMediaFactory = SocialMediaFactory;
