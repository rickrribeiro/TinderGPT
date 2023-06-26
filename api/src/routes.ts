import { Router, Request, Response } from 'express';
import config from './config'
import { DependencyContainer } from './dependency-container';
import { authMiddleware } from './middlewares/auth-middleware';
export class Routes {

    public static setUp(dependencies: DependencyContainer): Router {
        const routes = new (Router as any)();

        // TODO - REMOVE THIS ROUTE - route for development tests
        routes.post('/teste', authMiddleware, async (req: Request, res: Response) => {
            const { userId } = req.body;
            const { redisService } = dependencies;

            res.send(userId);
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

                //const { userId } = req.body;
                const { socialMediaService } = dependencies;
                const session = req.headers['x-auth-token'] as string;
                const newMatches = await socialMediaService.getNewMatches(session)

                res.send(newMatches);
            } catch (err: any) {
                res.status(500).send({ message: err.message, name: err.name, code: err.code })
            }
        });

        routes.get('/getUserById/:userId', authMiddleware, async (req: Request, res: Response) => {
            try {

                const { userId } = req.params;
                const { socialMediaService } = dependencies;
                const session = req.headers['x-auth-token'] as string;
                const user = await socialMediaService.getUserById(session, userId)

                res.send(user);
            } catch (err: any) {
                res.status(500).send({ message: err.message, name: err.name, code: err.code })
            }
        });

        // routes.get('/messages/history', authMiddleware, async (req: Request, res: Response) => {
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


        return routes;
    }


}
