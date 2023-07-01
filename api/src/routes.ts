import { Router, Request, Response } from 'express';
import config from './config'
import { DependencyContainer } from './dependency-container';
import { authMiddleware } from './middlewares/auth-middleware';
import { CustomMessagesBuilder } from './services/ai_providers/custom-messages'
export class Routes {

    public static setUp(dependencies: DependencyContainer): Router {
        const routes = new (Router as any)();

        // TODO - REMOVE THIS ROUTE - route for development tests
        routes.post('/teste', async (req: Request, res: Response) => {
            try {
                const { userId, question } = req.body;
                const { aiProvider, socialMediaService, redisService } = dependencies;
                const resp = await aiProvider.ask(question);
                res.send(resp);
            } catch (err) {
                res.send(err)
            }
        });

        routes.post('/auth', async (req: Request, res: Response) => {
            const { redisService } = dependencies;
            /* 
            TODO - REMOVER VALORES MOCKADOS pois meu tinder não ta conectado no face
            adicionando manualmente o session, mas implementar depois
            */
            const userId = config.SOCIAL_MEDIA_SERVICES.TINDER.USER_ID;
            const session = config.SOCIAL_MEDIA_SERVICES.TINDER.SESSION;

            await redisService.setKey(session, userId)
            res.send(session)
        });



        routes.get('/newMatches', authMiddleware, async (req: Request, res: Response) => {
            try {
                // Aplicar os filstros de distancia

                const { socialMediaService } = dependencies;
                const session = config.SOCIAL_MEDIA_SERVICES.TINDER.SESSION;//req.headers['x-auth-token'] as string;

                const newMatches = await socialMediaService.getNewMatches(session)

                res.send(newMatches);
            } catch (err: any) {
                res.status(500).send({ message: err.message, name: err.name, code: err.code })
            }
        });

        routes.get('/messages/:id', authMiddleware, async (req: Request, res: Response) => {
            const { id } = req.params;

            const { socialMediaService } = dependencies;
            const session = config.SOCIAL_MEDIA_SERVICES.TINDER.SESSION;
            // let messages = []

            const matchId = id + config.SOCIAL_MEDIA_SERVICES.TINDER.USER_ID;
            let history = await socialMediaService.getMessageHistory(session, matchId);
            // console.log(history);
            res.send(history);
        });

        routes.get('/getUserById/:userId', authMiddleware, async (req: Request, res: Response) => {
            try {

                const { userId } = req.params;
                const { socialMediaService } = dependencies;
                const session = config.SOCIAL_MEDIA_SERVICES.TINDER.SESSION;//req.headers['x-auth-token'] as string;
                const user = await socialMediaService.getUserById(session, userId)

                res.send(user);
            } catch (err: any) {
                res.status(500).send({ message: err.message, name: err.name, code: err.code })
            }
        });

        routes.post('/sendMessages', async (req: Request, res: Response) => {
            try {

                const { users, message }: { users: Array<string>, message: string } = req.body;
                const { socialMediaService } = dependencies;
                const session = config.SOCIAL_MEDIA_SERVICES.TINDER.SESSION;
                users.map(async (user: any) => {
                    console.log(`${user} - ${message}`)
                    await socialMediaService.sendMessage(session, user, message)
                })

                res.send(true)
            } catch (err) {
                console.log(err);
                res.send(false)
            }
        });

        routes.get('/recommendations/newmatches', async (req: Request, res: Response) => {
            const customMessagesBuilder = new CustomMessagesBuilder();
            const session = config.SOCIAL_MEDIA_SERVICES.TINDER.SESSION;
            const { aiProvider, socialMediaService } = dependencies;
            const bio = await socialMediaService.getMyBio(session)
            const resps: any = await aiProvider.ask(customMessagesBuilder.firstMessageRecommendations(bio));
            res.send(resps.choices[0].message.content)
        });

        routes.get('/mybio', async (req: Request, res: Response) => {
            const { socialMediaService } = dependencies;
            const session = config.SOCIAL_MEDIA_SERVICES.TINDER.SESSION;
            const bio = await socialMediaService.getMyBio(session)
            res.send(bio);
        });

        routes.get('/recommendations/match/:id', authMiddleware, async (req: Request, res: Response) => {
            try {
                const { id } = req.params;
                const customMessagesBuilder = new CustomMessagesBuilder();
                const session = config.SOCIAL_MEDIA_SERVICES.TINDER.SESSION;
                const { aiProvider, socialMediaService } = dependencies;

                const bio = await socialMediaService.getMyBio(session)
                const matchProfile = await socialMediaService.getUserById(session, id)
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
                const resps: any = await aiProvider.ask(customMessagesBuilder.bioBasedMessage(bio, matchProfile.bio));
                res.send(resps.choices[0].message.content)
            } catch (err) {
                console.log(err);
                console.log("ERRO NA RECOMENDAÇÃO GPT")
                res.send([])
            }
        });

        routes.get('/matchesWithUnreadMessages', authMiddleware, async (req: Request, res: Response) => {
            try {

                const { socialMediaService } = dependencies;
                const session = config.SOCIAL_MEDIA_SERVICES.TINDER.SESSION; //req.headers['x-auth-token'] as string;
                const matchesWithUnreadMessages = ((await socialMediaService.getMatchesWithUnreadMessages(session)).map((el => ({ ...el, isNewMatch: false }))))
                const newMatches = ((await socialMediaService.getNewMatches(session)).map((el => ({ ...el, isNewMatch: true }))))
                const matches = matchesWithUnreadMessages.concat(newMatches);
                res.send(matches);
            } catch (err: any) {
                res.status(500).send({ message: err.message, name: err.name, code: err.code })
            }
        });

        return routes;
    }


}
