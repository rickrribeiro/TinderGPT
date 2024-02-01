"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DependencyContainer = void 0;
const data_1 = require("./data");
const services_1 = require("./services");
class DependencyContainer {
    constructor({ aiProvider, socialMediaService }) {
        this.aiProvider = services_1.AIProviderFactory.getAIProvider(aiProvider);
        this.socialMediaService = services_1.SocialMediaFactory.getSocialMediaService(socialMediaService);
        this.redisService = data_1.RedisService.getRedisClient();
    }
    static getInstance(dependencies) {
        if (!this.dependencyContainer) {
            this.dependencyContainer = new DependencyContainer(dependencies);
        }
        return this.dependencyContainer;
    }
}
exports.DependencyContainer = DependencyContainer;
