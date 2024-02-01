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
exports.ChatGPT = void 0;
const openai_1 = require("openai");
const config_1 = __importDefault(require("../../config"));
class ChatGPT {
    constructor() {
        const configuration = new openai_1.Configuration({
            apiKey: config_1.default.AI_PROVIDERS.CHAT_GPT.OPENAI_API_KEY
        });
        this.openai = new openai_1.OpenAIApi(configuration);
    }
    ask(question) {
        return __awaiter(this, void 0, void 0, function* () {
            const completion = yield this.openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [{ content: question, role: "user" }],
            });
            return completion.data;
        });
    }
    draw() {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield this.openai.createImage({
                prompt: "uma imagem relacionando one piece e maplestory",
                n: 1,
                size: "1024x1024"
            });
            console.log(response);
            return response;
        });
    }
}
exports.ChatGPT = ChatGPT;
