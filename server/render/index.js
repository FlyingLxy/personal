/**
 * Created by lxy on 16/8/21.
 */
import { Router } from 'express';
import { createMemoryHistory,match, RouterContext } from 'react-router';
import createRoute from '../../common/routes';
import createStore from '../../common/store';
//import _history from '../../common/src/history';
import { syncHistoryWithStore } from 'react-router-redux';
//import createHistory from 'history/lib/createMemoryHistory.js';
import bootup from './bootup';

const router = Router();

router.use((req, res, next) => {
    const memoryHistory = createMemoryHistory(req.url);
    const store = createStore(memoryHistory);
    const history = syncHistoryWithStore(memoryHistory, store);
    const routes = createRoute(history);
    //const location = history.createLocation(`/flyingfox${req.url}`);
    match({history, routes, location: `/flyingfox${req.url}`}, (err, redirectLocation, renderProps) => {
        if (err) {
            res.status(500).send(err.message);
        }
        if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        }

        if (renderProps) {
            // code...
            res.status(200).end(bootup(renderProps, req.headers['user-agent'], store)({
                lang: 'zh-CN',
                title: 'flyingfox'
            }));
        } else {
            res.status(404).send('Not Found');
        }
    })
})

export default router;