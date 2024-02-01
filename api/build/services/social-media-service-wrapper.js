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
exports.SocialMediaServiceWrapper = void 0;
class SocialMediaServiceWrapper {
    constructor(service) {
        this.service = service;
    }
    getMatchesWithUnreadMessages(session) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.service.getMatchesWithUnreadMessages(session);
        });
    }
    getMessageHistory(session, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.service.getMessageHistory(session, id);
        });
    }
    getMyBio(session) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.service.getMyBio(session);
        });
    }
    getUserById(session, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.service.getUserById(session, userId);
        });
    }
    sendMessage(session, userId, message) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.service.sendMessage(session, userId, message);
        });
    }
    getNewMatches(session, minDistance = 0, maxDistance = 99999, hasBio = true) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.service.getNewMatches(session, minDistance, maxDistance, hasBio);
        });
    }
}
exports.SocialMediaServiceWrapper = SocialMediaServiceWrapper;
