import { RedisService } from './data'
import { AIProviderFactory, AIProviderWrapper, SocialMediaFactory, SocialMediaServiceWrapper } from "./services";

export class DependencyContainer {
    private static dependencyContainer: DependencyContainer;
    public aiProvider: AIProviderWrapper;
    public socialMediaService: SocialMediaServiceWrapper;
    public redisService: RedisService;
    constructor({ aiProvider, socialMediaService }: any) {
        this.aiProvider = AIProviderFactory.getAIProvider(aiProvider);
        this.socialMediaService = SocialMediaFactory.getSocialMediaService(socialMediaService);
        this.redisService = RedisService.getRedisClient()
    }

    public static getInstance(dependencies?: any) {
        if (!this.dependencyContainer) {
            this.dependencyContainer = new DependencyContainer(dependencies);
        }
        return this.dependencyContainer;
    }

}