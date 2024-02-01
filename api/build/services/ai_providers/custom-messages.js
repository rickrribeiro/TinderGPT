"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomMessagesBuilder = void 0;
const config_1 = __importDefault(require("../../config/config"));
class CustomMessagesBuilder {
    // POUCAS ESTÃO CORRETAS, AJUSTAR AINDA!!!!!!!!
    firstMessageRecommendations(bio) {
        return `Acabei de chegar na cidade de buenos aires e não conheço nada aqui, me dê 5 sugestões de mensagens para mandar para puxar conversa com uma menina no tinder? Responda no formato ["sugestão 1", "sugestão 2", "sugestão 3","sugestão 4","sugestão 5"]. Uma breve descrição sobre mim: ${bio}`;
    }
    bioBasedMessage(bio, matchBio) {
        /*
         * Outras Possibilidades: mandar lista de tópicos de interesses
         */
        return `
        Quero que você gere sugestões de mensagem para que eu possa enviar para essa menina que dei match no tinder baseada em nossas descrições.   
        Minha descrição: "${bio}" |
        Descrição dela: "${matchBio}"
        `;
    }
    // history only
    simpleHistoryBasedMessage(message, history) {
        /*
         * Outras Possibilidades: mandar o historico de msgs, mandar lista de tópicos
         */
        return `
        Quero que você gere sugestões de respostas para as seguintes mensagens ${config_1.default.BASE_MESSAGE} do   Tinder tomando como base minha descrição e o histórico da conversa.   
        Descrição: "${config_1.default.BASE_MESSAGE}".
        Histórico: "${history}". 
        Dê continuidade a conversa como se fosse eu:
        "${message}"
        `;
    }
    topicBaseMessage(myTopics, matchTopics) {
        /*
         * Outras Possibilidades: mandar o historico de msgs, mandar lista de tópicos
         */
        return `
        Quero que você gere sugestões de respostas para as seguintes mensagens ${config_1.default.BASE_MESSAGE} do   Tinder tomando como base minha descrição e o histórico da conversa.   
        Descrição: "${config_1.default.BASE_MESSAGE}".
        Histórico: "${""}". 
        Dê continuidade a conversa como se fosse eu:
        "${""}"
        `;
    }
    bioAndTopicsBaseMessage(message, history) {
        /*
         * Outras Possibilidades: mandar o historico de msgs, mandar lista de tópicos
         */
        return `
        Quero que você gere sugestões de respostas para as seguintes mensagens ${config_1.default.BASE_MESSAGE} do   Tinder tomando como base minha descrição e o histórico da conversa.   
        Descrição: "${config_1.default.BASE_MESSAGE}".
        Histórico: "${history}". 
        Dê continuidade a conversa como se fosse eu:
        "${message}"
        `;
    }
    historyWithTopicsBasedMessage(message, history) {
        /*
         * Outras Possibilidades: mandar o historico de msgs, mandar lista de tópicos
         */
        return `
        Quero que você gere sugestões de respostas para as seguintes mensagens ${config_1.default.BASE_MESSAGE} do   Tinder tomando como base minha descrição e o histórico da conversa.   
        Descrição: "${config_1.default.BASE_MESSAGE}".
        Histórico: "${history}". 
        Dê continuidade a conversa como se fosse eu:
        "${message}"
        `;
    }
    historyWithBioAndTopicsBaseMessage(message, history) {
        /*
         * Outras Possibilidades: mandar o historico de msgs, mandar lista de tópicos
         */
        return `
        Quero que você gere sugestões de respostas para as seguintes mensagens ${config_1.default.BASE_MESSAGE} do   Tinder tomando como base minha descrição e o histórico da conversa.   
        Descrição: "${config_1.default.BASE_MESSAGE}".
        Histórico: "${history}". 
        Dê continuidade a conversa como se fosse eu:
        "${message}"
        `;
    }
    replyMessageBioBased(message, myBio, matchBio) {
        /*
         * Outras Possibilidades: mandar o historico de msgs, mandar lista de tópicos
         */
        return `
        Quero que você gere sugestões de respostas para as seguintes mensagens  do   Tinder tomando como base minha descrição.   
        Minha Descrição: "${myBio}".
        Descrição dela: "${matchBio}". 
        responda essas mensagens como se fosse eu:
        "${message}"
        `;
    }
}
exports.CustomMessagesBuilder = CustomMessagesBuilder;
