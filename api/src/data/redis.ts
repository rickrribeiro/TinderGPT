import { RedisClientType, createClient } from "redis";

export class RedisService {

    private static redisClient: RedisClientType;

    public static getRedisClient(): RedisService {
        // if (!this.redisClient) {
        //     this.redisClient = createClient();
        //     this.redisClient.on('error', err => console.log('Redis Client Error', err));
        //     this.redisClient.connect()
        // }
        return new RedisService()
    }

    public async getKey(key: string) {
        return "" //await RedisService.redisClient.get(key);
    }

    public async setKey(key: string, value: string) {
        return "" //await RedisService.redisClient.set(key, value)
    }

}