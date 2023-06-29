import { Router, Request, Response } from 'express';
import config from './config'
import { DependencyContainer } from './dependency-container';
import { authMiddleware } from './middlewares/auth-middleware';
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
                // botar um possivel filtro por distancia ou outros filtros

                const { socialMediaService } = dependencies;
                const session = config.SOCIAL_MEDIA_SERVICES.TINDER.SESSION;//req.headers['x-auth-token'] as string;

                const newMatches = await socialMediaService.getNewMatches(session)
                // const newMatches = [
                //     {
                //         photoUrl: "https://bootdey.com/img/Content/avatar/avatar1.png",
                //         bio: "BIO1",
                //         name: "Teste11",
                //         id: "1"
                //     },
                //     {
                //         photoUrl: "https://bootdey.com/img/Content/avatar/avatar1.png",
                //         isActive: true,
                //         bio: "BIO2",
                //         name: "Teste22",
                //         id: "2"
                //     },
                //     {
                //         photoUrl: "https://bootdey.com/img/Content/avatar/avatar1.png",
                //         bio: "BIO3",
                //         name: "Teste33",
                //         id: "3"
                //     },
                // ]
                res.send(newMatches);
            } catch (err: any) {
                res.status(500).send({ message: err.message, name: err.name, code: err.code })
            }
        });

        routes.get('/messages/:id', authMiddleware, async (req: Request, res: Response) => {
            const { id } = req.params; // botar pra pegar da api do tinder

            // const tinderClient = new TinderClient();
            // let messages = []
            // for (let match of matches) {
            //     let history = await tinderClient.getMessageHistory(match.id);
            //     messages.push(history);
            //     console.log(history);
            // }
            const messages = [
                {
                    message: "message1",
                    name: "rrr",
                    isUserMessage: true
                },
                {
                    isActive: true,
                    message: "message2",
                    name: "Teste" + id,
                },
                {
                    message: "message3",
                    name: "rrr",
                    isUserMessage: true
                }, {
                    message: "message3",
                    name: "Teste" + id,
                },
                {
                    message: "message3",
                    name: "Teste" + id,
                },
            ]
            res.send(messages);
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

        // routes.post('/sendMessage', async (req: Request, res: Response) => {
        // PARA APENAS UMA EPSSOA
        //     const { redisService } = dependencies;
        //     /* 
        //     TODO - REMOVER VALORES MOCKADOS pois meu tinder não ta conectado no face
        //     adicionando manualmente o session, mas implementar depois
        //     */
        //     const userId = config.SOCIAL_MEDIA_SERVICES.TINDER.USER_ID;
        //     const session = config.SOCIAL_MEDIA_SERVICES.TINDER.SESSION;

        //     await redisService.setKey(session, userId)
        //     res.send(session)
        // });

        // routes.post('/sendMessages', async (req: Request, res: Response) => {
        // para varios
        //     const { redisService } = dependencies;
        //     /* 
        //     TODO - REMOVER VALORES MOCKADOS pois meu tinder não ta conectado no face
        //     adicionando manualmente o session, mas implementar depois
        //     */
        //     const userId = config.SOCIAL_MEDIA_SERVICES.TINDER.USER_ID;
        //     const session = config.SOCIAL_MEDIA_SERVICES.TINDER.SESSION;

        //     await redisService.setKey(session, userId)
        //     res.send(session)
        // });



        // routes.get('/messages/recommendation', authMiddleware, async (req: Request, res: Response) => {
        //     const matches = [{ id: "123" }]; // botar pra pegar da api do tinder
        //     const
        //     const tinderClient = new TinderClient();
        //     let messages = []
        //     for (let match of matches) {
        //         let history = await tinderClient.getMessageHistory(match.id);
        //         messages.push(history);
        //         console.log(history);
        //     }
        //     res.send(messages);
        // });

        routes.get('/matchesWithUnreadMessages', authMiddleware, async (req: Request, res: Response) => {
            try {
                // // botar um possivel filtro por distancia ou outros filtros
                // //const { userId } = req.body;
                // const { socialMediaService } = dependencies;
                // const session = config.SOCIAL_MEDIA_SERVICES.TINDER.SESSION; //req.headers['x-auth-token'] as string;
                // const newMatches = await socialMediaService.getNewMatches(session)
                const matches = [
                    {
                        photoUrl: "https://bootdey.com/img/Content/avatar/avatar1.png",
                        name: "Teste11",
                        id: "1"
                    },
                    {
                        photoUrl: "https://bootdey.com/img/Content/avatar/avatar1.png",
                        name: "Teste22",
                        id: "2"
                    },
                    {
                        photoUrl: "https://bootdey.com/img/Content/avatar/avatar1.png",
                        name: "Teste33",
                        id: "3"
                    },
                ]
                res.send(matches);
            } catch (err: any) {
                res.status(500).send({ message: err.message, name: err.name, code: err.code })
            }
        });

        return routes;
    }


}
