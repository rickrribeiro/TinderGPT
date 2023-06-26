import { Router, Request, Response } from 'express';

import { DependencyContainer } from './dependency-container';

export class Routes {

    public static setUp(dependencies: DependencyContainer): Router {
        const routes = new (Router as any)();

        routes.post('/teste', async (req: Request, res: Response) => {
            const { username } = req.body;
            const { redisService } = dependencies;

            const key = await redisService.getKey(username)
            res.send(key);
        });

        routes.post('/auth', async (req: Request, res: Response) => {
            const { username, password } = req.body;
            const { redisService } = dependencies;

            const key = await redisService.setKey(username, password)
            res.send(key)
        });

        // route.get('/messages/history', async (req: Request, res: Response) => {
        //     const matches = [{ id: "123" }]; // botar pra pegar da api do tinder
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
