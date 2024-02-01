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
exports.Routes = void 0;
const express_1 = require("express");
const config_1 = __importDefault(require("./config"));
const auth_middleware_1 = require("./middlewares/auth-middleware");
const custom_messages_1 = require("./services/ai_providers/custom-messages");
class Routes {
    static setUp(dependencies) {
        const routes = new express_1.Router();
        // TODO - REMOVE THIS ROUTE - route for development tests
        routes.post('/teste', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, question } = req.body;
                const { aiProvider, socialMediaService, redisService } = dependencies;
                const resp = yield aiProvider.draw();
                res.send(resp.data);
            }
            catch (err) {
                res.send(err);
            }
        }));
        routes.post('/auth', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { redisService } = dependencies;
            /*
            TODO - REMOVER VALORES MOCKADOS pois meu tinder não ta conectado no face
            adicionando manualmente o session, mas implementar depois
            */
            const userId = config_1.default.SOCIAL_MEDIA_SERVICES.TINDER.USER_ID;
            const session = config_1.default.SOCIAL_MEDIA_SERVICES.TINDER.SESSION;
            yield redisService.setKey(session, userId);
            res.send(session);
        }));
        routes.get('/newMatches', auth_middleware_1.authMiddleware, (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { minDistance = '0', maxDistance = '99999', hasBio = true } = req.query;
                const { socialMediaService } = dependencies;
                const session = config_1.default.SOCIAL_MEDIA_SERVICES.TINDER.SESSION; //req.headers['x-auth-token'] as string;
                const newMatches = yield socialMediaService.getNewMatches(session, parseInt(minDistance), parseInt(maxDistance), hasBio);
                res.send(newMatches);
            }
            catch (err) {
                res.status(500).send({ message: err.message, name: err.name, code: err.code });
            }
        }));
        routes.get('/messages/:id', auth_middleware_1.authMiddleware, (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { socialMediaService } = dependencies;
                const session = config_1.default.SOCIAL_MEDIA_SERVICES.TINDER.SESSION;
                // let messages = []
                const matchId = id + config_1.default.SOCIAL_MEDIA_SERVICES.TINDER.USER_ID;
                let history = yield socialMediaService.getMessageHistory(session, matchId);
                // console.log(history);
                if (!history || history.length == 0) {
                    const matchId = config_1.default.SOCIAL_MEDIA_SERVICES.TINDER.USER_ID + id;
                    history = yield socialMediaService.getMessageHistory(session, matchId);
                }
                res.send(history);
            }
            catch (err) {
                console.log(err);
                res.send([]);
            }
        }));
        routes.get('/getUserById/:userId', auth_middleware_1.authMiddleware, (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const { socialMediaService } = dependencies;
                const session = config_1.default.SOCIAL_MEDIA_SERVICES.TINDER.SESSION; //req.headers['x-auth-token'] as string;
                const user = yield socialMediaService.getUserById(session, userId);
                res.send(user);
            }
            catch (err) {
                res.status(500).send({ message: err.message, name: err.name, code: err.code });
            }
        }));
        routes.post('/sendMessages', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { users, message } = req.body;
                const { socialMediaService } = dependencies;
                const session = config_1.default.SOCIAL_MEDIA_SERVICES.TINDER.SESSION;
                for (const user of users) {
                    console.log(`${user} - ${message}`);
                    const matchId = user + config_1.default.SOCIAL_MEDIA_SERVICES.TINDER.USER_ID;
                    yield new Promise((r) => {
                        setTimeout(r, 1000);
                    });
                    try {
                        yield socialMediaService.sendMessage(session, matchId, message);
                    }
                    catch (err) {
                        const matchId = config_1.default.SOCIAL_MEDIA_SERVICES.TINDER.USER_ID + user;
                        yield socialMediaService.sendMessage(session, matchId, message);
                    }
                }
                res.send(true);
            }
            catch (err) {
                console.log(err.message);
                console.log("Error send message");
                res.send(false);
            }
        }));
        routes.get('/recommendations/newmatches', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const customMessagesBuilder = new custom_messages_1.CustomMessagesBuilder();
                const session = config_1.default.SOCIAL_MEDIA_SERVICES.TINDER.SESSION;
                const { aiProvider, socialMediaService } = dependencies;
                const bio = yield socialMediaService.getMyBio(session);
                const resps = yield aiProvider.ask(customMessagesBuilder.firstMessageRecommendations(bio));
                res.send(resps.choices[0].message.content);
            }
            catch (err) {
                console.log(err);
                res.send([]);
            }
        }));
        routes.get('/mybio', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { socialMediaService } = dependencies;
                const session = config_1.default.SOCIAL_MEDIA_SERVICES.TINDER.SESSION;
                const bio = yield socialMediaService.getMyBio(session);
                res.send(bio);
            }
            catch (err) {
                console.log(err);
                res.send('');
            }
        }));
        routes.get('/recommendations/match/:id', auth_middleware_1.authMiddleware, (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const customMessagesBuilder = new custom_messages_1.CustomMessagesBuilder();
                const session = config_1.default.SOCIAL_MEDIA_SERVICES.TINDER.SESSION;
                const { aiProvider, socialMediaService } = dependencies;
                const bio = yield socialMediaService.getMyBio(session);
                const matchProfile = yield socialMediaService.getUserById(session, id);
                // INICIO DA ALTERAÇÃO RAPIDA antes da apresentação
                // let resps: any;
                // const lastMessages: Array<any> = await socialMediaService.getMessageHistory(session, id + config.SOCIAL_MEDIA_SERVICES
                //     .TINDER.USER_ID);
                // if (lastMessages?.length > 0) {
                //     const messages = lastMessages.reverse()[0]; // SE DER TEMPO PEGAR AS ULTIMAS DELA
                //     resps = await aiProvider.ask(customMessagesBuilder.replyMessageBioBased(messages, bio, matchProfile.bio));
                // } else {
                //     resps = await aiProvider.ask(customMessagesBuilder.bioBasedMessage(bio, matchProfile.bio));
                // }
                //FIM DA ALTERAÇÃO
                const resps = yield aiProvider.ask(customMessagesBuilder.bioBasedMessage(bio, matchProfile.bio));
                res.send(resps.choices[0].message.content);
            }
            catch (err) {
                console.log(err);
                console.log("ERRO NA RECOMENDAÇÃO GPT");
                res.send([]);
            }
        }));
        routes.get('/matchesWithUnreadMessages', auth_middleware_1.authMiddleware, (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { socialMediaService } = dependencies;
                const session = config_1.default.SOCIAL_MEDIA_SERVICES.TINDER.SESSION; //req.headers['x-auth-token'] as string;
                const matchesWithUnreadMessages = ((yield socialMediaService.getMatchesWithUnreadMessages(session)).map((el => (Object.assign(Object.assign({}, el), { isNewMatch: false })))));
                const newMatches = ((yield socialMediaService.getNewMatches(session)).map((el => (Object.assign(Object.assign({}, el), { isNewMatch: true })))));
                const matches = matchesWithUnreadMessages.concat(newMatches);
                res.send(matches);
            }
            catch (err) {
                res.status(500).send({ message: err.message, name: err.name, code: err.code });
            }
        }));
        routes.get('/matchesWithUnreadMessages', auth_middleware_1.authMiddleware, (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { socialMediaService } = dependencies;
                const session = config_1.default.SOCIAL_MEDIA_SERVICES.TINDER.SESSION; //req.headers['x-auth-token'] as string;
                const matchesWithUnreadMessages = ((yield socialMediaService.getMatchesWithUnreadMessages(session)).map((el => (Object.assign(Object.assign({}, el), { isNewMatch: false })))));
                const newMatches = ((yield socialMediaService.getNewMatches(session)).map((el => (Object.assign(Object.assign({}, el), { isNewMatch: true })))));
                const matches = matchesWithUnreadMessages.concat(newMatches);
                res.send(matches);
            }
            catch (err) {
                res.status(500).send({ message: err.message, name: err.name, code: err.code });
            }
        }));
        return routes;
    }
}
exports.Routes = Routes;
