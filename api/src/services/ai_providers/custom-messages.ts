import config from "../../config/config";

export class CustomMessagesBuilder {


    public firstMessageRecommendations(bio: string): string {
        return `Acabei de chegar na cidade de são paulo e não conheço nada aqui, me dê 5 sugestões de mensagens para mandar para puxar conversa com uma menina no tinder? Responda no formato ["sugestão 1", "sugestão 2", "sugestão 3","sugestão 4","sugestão 5"]. Uma breve descrição sobre mim: ${bio}`
    }

    public historyBasedMessage(message: string, history: string) {
        /*
         * Outras Possibilidades: mandar o historico de msgs, mandar lista de tópicos
         */
        return `
        Quero que você gere sugestões de respostas para as seguintes mensagens ${config.BASE_MESSAGE} do   Tinder tomando como base minha descrição e o histórico da conversa.   
        Descrição: "${config.BASE_MESSAGE}".
        Histórico: "${history}". 
        Responda a seguinte mensagem como se fosse eu:
        "${message}"
        `;
    }
}