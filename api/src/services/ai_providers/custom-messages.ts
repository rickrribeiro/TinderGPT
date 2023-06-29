import config from "../../config/config";

export class CustomMessagesBuilder {

    public firstMessageRecommendations(): string {
        return `Estou na cidade de são paulo, minha bio é {bio}, 
        qual mensagem devo mandar para puxar conversa com uma menina no tinder?`
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