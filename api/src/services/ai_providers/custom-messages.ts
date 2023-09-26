import config from "../../config/config";

export class CustomMessagesBuilder {

    // POUCAS ESTÃO CORRETAS, AJUSTAR AINDA!!!!!!!!

    public firstMessageRecommendations(bio: string): string {
        return `Acabei de chegar na cidade de buenos aires e não conheço nada aqui, me dê 5 sugestões de mensagens para mandar para puxar conversa com uma menina no tinder? Responda no formato ["sugestão 1", "sugestão 2", "sugestão 3","sugestão 4","sugestão 5"]. Uma breve descrição sobre mim: ${bio}`
    }

    public bioBasedMessage(bio: string, matchBio: string) {
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
    public simpleHistoryBasedMessage(message: string, history: string) {
        /*
         * Outras Possibilidades: mandar o historico de msgs, mandar lista de tópicos
         */
        return `
        Quero que você gere sugestões de respostas para as seguintes mensagens ${config.BASE_MESSAGE} do   Tinder tomando como base minha descrição e o histórico da conversa.   
        Descrição: "${config.BASE_MESSAGE}".
        Histórico: "${history}". 
        Dê continuidade a conversa como se fosse eu:
        "${message}"
        `;
    }

    public topicBaseMessage(myTopics: string, matchTopics: string) {
        /*
         * Outras Possibilidades: mandar o historico de msgs, mandar lista de tópicos
         */
        return `
        Quero que você gere sugestões de respostas para as seguintes mensagens ${config.BASE_MESSAGE} do   Tinder tomando como base minha descrição e o histórico da conversa.   
        Descrição: "${config.BASE_MESSAGE}".
        Histórico: "${""}". 
        Dê continuidade a conversa como se fosse eu:
        "${""}"
        `;
    }

    public bioAndTopicsBaseMessage(message: string, history: string) {
        /*
         * Outras Possibilidades: mandar o historico de msgs, mandar lista de tópicos
         */
        return `
        Quero que você gere sugestões de respostas para as seguintes mensagens ${config.BASE_MESSAGE} do   Tinder tomando como base minha descrição e o histórico da conversa.   
        Descrição: "${config.BASE_MESSAGE}".
        Histórico: "${history}". 
        Dê continuidade a conversa como se fosse eu:
        "${message}"
        `;
    }

    public historyWithTopicsBasedMessage(message: string, history: string) {
        /*
         * Outras Possibilidades: mandar o historico de msgs, mandar lista de tópicos
         */
        return `
        Quero que você gere sugestões de respostas para as seguintes mensagens ${config.BASE_MESSAGE} do   Tinder tomando como base minha descrição e o histórico da conversa.   
        Descrição: "${config.BASE_MESSAGE}".
        Histórico: "${history}". 
        Dê continuidade a conversa como se fosse eu:
        "${message}"
        `;
    }

    public historyWithBioAndTopicsBaseMessage(message: string, history: string) {
        /*
         * Outras Possibilidades: mandar o historico de msgs, mandar lista de tópicos
         */
        return `
        Quero que você gere sugestões de respostas para as seguintes mensagens ${config.BASE_MESSAGE} do   Tinder tomando como base minha descrição e o histórico da conversa.   
        Descrição: "${config.BASE_MESSAGE}".
        Histórico: "${history}". 
        Dê continuidade a conversa como se fosse eu:
        "${message}"
        `;
    }
    public replyMessageBioBased(message: string, myBio: string, matchBio: string) {
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