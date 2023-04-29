const dbConnection = require('../../database/mySQLconnect');




const numInBeginnerQueue = async (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT DISTINCT user_id FROM beginner_queue WHERE role_id=?`;
        dbConnection.query({
            sql: query,
            values: [ctx.params.role_id]
        }, (error, tuples) => {
            if (error) {
                console.log('Connection error in TransactionsController::transactionsForRoute', error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log('Database connection error in transactionsForRoute.', err);
        ctx.body = [];
        ctx.status = 500;
    });
}


const numInIntermediateQueue = async (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT DISTINCT user_id FROM intermediate_queue WHERE role_id=?`;
        dbConnection.query({
            sql: query,
            values: [ctx.params.role_id]
        }, (error, tuples) => {
            if (error) {
                console.log('Connection error in TransactionsController::transactionsForRoute', error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log('Database connection error in transactionsForRoute.', err);
        ctx.body = [];
        ctx.status = 500;
    });
}


const numInExpertQueue = async (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT DISTINCT user_id FROM expert_queue WHERE role_id=?`;
        dbConnection.query({
            sql: query,
            values: [ctx.params.role_id]
        }, (error, tuples) => {
            if (error) {
                console.log('Connection error in TransactionsController::transactionsForRoute', error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log('Database connection error in transactionsForRoute.', err);
        ctx.body = [];
        ctx.status = 500;
    });
}

module.exports = {
    numInBeginnerQueue,
    numInIntermediateQueue,
    numInExpertQueue

};