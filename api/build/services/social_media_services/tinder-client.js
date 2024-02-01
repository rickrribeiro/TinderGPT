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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TinderClient = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../../config"));
class TinderClient {
    constructor() {
        this.baseUrl = config_1.default.SOCIAL_MEDIA_SERVICES.TINDER.url;
        this.defaultHeaders = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        };
    }
    static getTinderClient() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.tinderClient) {
                this.tinderClient = new TinderClient();
            }
            return this.tinderClient;
        });
    }
    getMatchesWithUnreadMessages(session) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.baseUrl + '/v2/matches?locale=en&count=100&message=1&is_tinder_u=false';
            try {
                const res = yield axios_1.default.get(url, { headers: Object.assign(Object.assign({}, this.defaultHeaders), { "x-auth-token": session }) });
                const newMatches = res.data.data.matches.filter((el) => el.messages[0].from != config_1.default.SOCIAL_MEDIA_SERVICES.TINDER.USER_ID).map((el) => {
                    return {
                        id: el.person._id,
                        name: el.person.name,
                        photoUrl: el.person.photos[0].url
                    };
                });
                // const matchesNames = newMatches.map((el) => el.person.name)
                return newMatches;
            }
            catch (err) {
                console.log(err.message);
                return [];
            }
        });
    }
    getMessageHistory(session, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.baseUrl + `/v2/matches/${id}/messages?locale=en&count=100`;
            // const url = this.baseUrl + `/v2/matches/5d1038b6261c7c1500155c2063f94fcf7c2cdf0100e0bf84/messages?locale=en&count=100`
            try {
                const res = yield axios_1.default.get(url, { headers: Object.assign(Object.assign({}, this.defaultHeaders), { "x-auth-token": session }) });
                const messages = res.data.data.messages.map((el) => {
                    const isUserMessage = el.from != id.replace(config_1.default.SOCIAL_MEDIA_SERVICES.TINDER.USER_ID, '') ? true : false; // '63f94fcf7c2cdf0100e0bf84'
                    return {
                        message: el.message,
                        isUserMessage: isUserMessage
                    };
                });
                return messages.reverse();
            }
            catch (err) {
                console.log(err.message);
                return [];
            }
        });
    }
    // todo - chang has bio to be true, false or undefined
    // todo change brazilian filter to be true, false or undefined and add variable 
    getNewMatches(session, minDistance = 0, maxDistance = 99999, hasBio = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.baseUrl + '/v2/matches?locale=en&count=100&message=0&is_tinder_u=false';
            try {
                const res = yield axios_1.default.get(url, { headers: Object.assign(Object.assign({}, this.defaultHeaders), { "x-auth-token": session }) });
                const newMatches = [];
                for (const match of res.data.data.matches) {
                    yield new Promise((resolve) => {
                        setTimeout(resolve, 10);
                    });
                    const user = yield this.getUserById(session, match.person._id);
                    const distanceKm = user.distance_mi * 1.60934;
                    let shouldSkip = false;
                    if (!hasBio && user.bio && user.bio.length > 0) {
                        shouldSkip = true;
                    }
                    else if (hasBio && user.bio && user.bio.length === 0) {
                        shouldSkip = true;
                    }
                    // if (!user.bio.includes("🇧🇷")) {
                    //   shouldSkip = true
                    // }
                    //todo - move o distance para o padrãod o should skip e limpar o codigo
                    if (distanceKm > minDistance && distanceKm < maxDistance && !shouldSkip) {
                        newMatches.push({
                            id: match.person._id,
                            name: match.person.name,
                            photoUrl: match.person.photos[0].url,
                            bio: match.person.bio,
                            distance: distanceKm
                        });
                    }
                }
                ;
                // const matchesNames = newMatches.map((el) => el.person.name)
                return newMatches;
            }
            catch (err) {
                console.log(err.message);
                return [];
            }
        });
    }
    getMyBio(session) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.baseUrl + '/v2/profile?locale=en&include=user';
            const res = yield axios_1.default.get(url, { headers: Object.assign(Object.assign({}, this.defaultHeaders), { "x-auth-token": session }) });
            const bio = res.data.data.user.bio;
            // console.log(res.data.data.user.bio);
            // return bio;
            return "Amo viajar, tomar cerveja, jogos online, ler e sair para conhecer lugares novos!";
        });
    }
    getUserById(session, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.baseUrl + `/user/${userId}?locale=en`;
            const res = yield axios_1.default.get(url, { headers: Object.assign(Object.assign({}, this.defaultHeaders), { "x-auth-token": session }) });
            const user = res.data.results;
            return user;
        });
    }
    sendMessage(session, matchId, message) {
        return __awaiter(this, void 0, void 0, function* () {
            //  const matchId = '62939d6598c12601004e17d363f94fcf7c2cdf0100e0bf84';
            const url = this.baseUrl + `/user/matches/${matchId}?locale=en`;
            const payload = {
                "message": message
            };
            yield axios_1.default.post(url, payload, { headers: Object.assign(Object.assign({}, this.defaultHeaders), { "x-auth-token": session }) });
        });
    }
    auth(facebook_token, facebook_id) {
        return __awaiter(this, void 0, void 0, function* () {
            /*
            TODO - Não implementado pois meu tinder não ta conectado no face
            adicionando manualmente o session, mas implementar depois
            */
            const token = yield axios_1.default.post(this.baseUrl, { facebook_id, facebook_token }, { headers: this.defaultHeaders });
            return token.data;
        });
    }
}
exports.TinderClient = TinderClient;
