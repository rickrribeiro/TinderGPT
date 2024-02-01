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
exports.authMiddleware = void 0;
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const { redisService } = DependencyContainer.getInstance();
    const session = 'a'; //req.headers["x-auth-token"] as string;
    if (!session) {
        return res.status(403).send("A token is required for authentication");
    }
    // const key = await redisService.getKey(session)
    // if (!key) {
    //     return res.status(401).send("Invalid tinder session token.");
    // }
    // req.body.userId = key;
    next();
});
exports.authMiddleware = authMiddleware;
