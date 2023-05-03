const Authorize = require('../app/Middleware/Authorize.js');
const VerifyJWT = require('../app/Middleware/VerifyJWT.js');


/*
|--------------------------------------------------------------------------
| Default router
|--------------------------------------------------------------------------
|
| Default router is used to define any routes that don't belong to a
| controller. Also used as a parent container for the other routers.
|
*/
const router = require('koa-router')({
    prefix: '/api/v1'
});

router.get('/', function (ctx) {
    console.log('router.get(/)');
    return ctx.body = 'What is up?';
});

/*
|--------------------------------------------------------------------------
| login router
|--------------------------------------------------------------------------
|
| Description
|
*/

// Login router configuration.

const LoginController = require('../app/Controllers/LoginController.js');
const loginRouter = require('koa-router')({
    prefix: '/login'
});


loginRouter.get('/:user_id', LoginController.authorizeUser, (err) => console.log("database_routes.js: login-route error:", err));
loginRouter.use(VerifyJWT);
loginRouter.post('/', LoginController.createUser);


const QueueController = require('../app/Controllers/QueueController.js');
const queueRouter = require('koa-router')({
    prefix: '/queue'
});

queueRouter.use(VerifyJWT);
queueRouter.get('/beginner/:role_id', QueueController.numInBeginnerQueue);
queueRouter.get('/intermediate/:role_id', QueueController.numInIntermediateQueue);
queueRouter.get('/expert/:role_id', QueueController.numInExpertQueue);
queueRouter.post('/insert', QueueController.insertUser);
queueRouter.post('/remove/:user_id', QueueController.removeUser);
queueRouter.post('/matchmake', QueueController.matchmake);
queueRouter.put('/:user_id/:role_id/addRank', QueueController.addRank);
queueRouter.put('/:user_id/:role_id/subtractRank', QueueController.subtractRank);



const StatisticsController = require('../app/Controllers/StatisticsController.js');
const statisticsRouter = require('koa-router')({
    prefix: '/stats'
});


statisticsRouter.get('/:user_id/ranks', StatisticsController.UserRanks);

statisticsRouter.get('/:user_id/stats', StatisticsController.getStats);
statisticsRouter.use(VerifyJWT);
statisticsRouter.put('/:user_id/:damage_done/:healing_done', StatisticsController.updateStats);
statisticsRouter.put('/winner', StatisticsController.updateWins);
statisticsRouter.put('/loser', StatisticsController.updateGames);


/**
 * Register all of the controllers into the default controller.
 */
router.use(
    '',
    loginRouter.routes(),
    queueRouter.routes(),
    statisticsRouter.routes()
);

module.exports = function (app) {
    app.use(router.routes());
    app.use(router.allowedMethods());
};
