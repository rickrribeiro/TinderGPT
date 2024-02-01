"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
class RedisService {
    static getRedisClient() {
        // if (!this.redisClient) {
        //     this.redisClient = createClient();
        //     this.redisClient.on('error', err => console.log('Redis Client Error', err));
        //     this.redisClient.connect()
        // }
        return new RedisService();
    }
    getKey(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return ""; //await RedisService.redisClient.get(key);
        });
    }
    setKey(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return ""; //await RedisService.redisClient.set(key, value)
        });
    }
}
exports.RedisService = RedisService;
