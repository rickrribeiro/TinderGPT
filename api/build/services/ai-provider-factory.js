"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIProviderFactory = void 0;
const ai_provider_wrapper_1 = require("./ai-provider-wrapper");
const ai_providers_enum_1 = require("./enums/ai-providers-enum");
const ai_providers_1 = require("./ai_providers");
class AIProviderFactory {
    static getAIProvider(providerName) {
        let provider;
        if (providerName === ai_providers_enum_1.AIProvidersEnum.CHATGPT) {
            provider = ai_providers_1.ChatGPT;
        }
        else {
            provider = ai_providers_1.ChatGPT; // DEFAULT
        }
        return new ai_provider_wrapper_1.AIProviderWrapper(new provider());
    }
}
exports.AIProviderFactory = AIProviderFactory;
