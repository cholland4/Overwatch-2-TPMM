const dbConnection = require('../../database/mySQLconnect');
const setAccessToken = require('../../config/setAccessToken');
const {value} = require("lodash/seq");
require('dotenv').config();

const UserRanks = async (ctx) => {
    return new Promise((resolve, reject) => {
        const u_id = ctx.params.user_id.replace('#','-');

        let query = "SELECT tank_rank, dps_rank, support_rank FROM users WHERE user_id = ?";
        dbConnection.query(
            {
                sql: query,
                values: [u_id]
            }, (error, tuples) => {
                if (error) {
                    console.log("Query error.", error);
                    return reject(`Query error. Error msg: ${error}`);
                }
                if (tuples.length === 1) {  // Did we have a matching user record?
                    setAccessToken(ctx, tuples[0]);
                    console.log('from user database. About to return ', tuples[0]);
                    ctx.body = {
                        status: "OK",
                        user: tuples[0],
                    };
                } else {
                    console.log('Not able to identify the user.');
                    return reject('No such user.');
                }
                return resolve();
            }
        )
    }).catch(err => {
        console.log('authorize in StatisticsController threw an exception. Reason...', err);
        ctx.status = 200;
        ctx.body = {
            status: "Failed",
            error: err,
            user: null
        };
    });
}

const updateStats = async (ctx) => {
    console.log(`API server::updateStats: ${JSON.stringify(ctx.request.body)}`);

    return new Promise((resolve, reject) => {
        const query = `UPDATE statistics SET damage_done = damage_done + ?, healing_done = healing_done + ? WHERE user_id=?`;
        dbConnection.query({
            sql: query,
            values: [ctx.params.damage_done, ctx.params.healing_done, ctx.params.user_id]
        }, (error, tuples) => {
            if (error) {
                console.log('Connection error in StatisticsController::updateStats', error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log('Database connection error in updateStats.', err);
        ctx.body = [];
        ctx.status = 500;
    });
}

const getStats = async (ctx) => {
    return new Promise((resolve, reject) => {
        const u_id = ctx.params.user_id.replace('#','-');

        let query = "SELECT tank_wins, tank_games, dps_wins, dps_games, support_wins, support_games, damage_done, healing_done FROM statistics WHERE user_id = ?";
        dbConnection.query(
            {
                sql: query,
                values: [u_id]
            }, (error, tuples) => {
                if (error) {
                    console.log("Query error.", error);
                    return reject(`Query error. Error msg: ${error}`);
                }
                if (tuples.length === 1) {  // Did we have a matching user record?
                    setAccessToken(ctx, tuples[0]);
                    console.log('from user database. About to return ', tuples[0]);
                    ctx.body = {
                        status: "OK",
                        user: tuples[0],
                    };
                } else {
                    console.log('Not able to identify the user.');
                    return reject('No such user.');
                }
                return resolve();
            }
        )
    }).catch(err => {
        console.log('authorize in StatisticsController threw an exception. Reason...', err);
        ctx.status = 200;
        ctx.body = {
            status: "Failed",
            error: err,
            user: null
        };
    });
}


const updateWins = async (ctx) => {
    console.log(`API server::updateWins: ${JSON.stringify(ctx.request.body)}`);

    const role_id = ctx.request.body.role;

    return new Promise((resolve, reject) => {
        let query;

        if (role_id === 'tank') {
            query = `
                       UPDATE statistics SET tank_wins= tank_wins + 1, tank_games= tank_games + 1 WHERE user_id=?
                        `;
        }
        else if (role_id === 'dps') {
            query = `
                       UPDATE statistics SET dps_wins= dps_wins + 1, dps_games= dps_games + 1 WHERE user_id=?
                        `;
        }
        else {
            query = `
                       UPDATE statistics SET support_wins= support_wins + 1, support_games= support_games + 1 WHERE user_id=?
                        `;
        }
        dbConnection.query({
            sql: query,
            values: [ctx.request.body.user_id]
        }, (error, tuples) => {
            if (error) {
                console.log('Connection error in StatisticsController::updateWins', error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log('Database connection error in updateWins.', err);
        ctx.body = [];
        ctx.status = 500;
    });
}


const updateGames = async (ctx) => {
    console.log(`API server::updateGames: ${JSON.stringify(ctx.request.body)}`);

    const role_id = ctx.request.body.role;

    return new Promise((resolve, reject) => {
        let query;

        if (role_id === 'tank') {
            query = `
                       UPDATE statistics SET tank_games= tank_games + 1 WHERE user_id=?
                        `;
        }
        else if (role_id === 'dps') {
            query = `
                       UPDATE statistics SET dps_games= dps_games + 1 WHERE user_id=?
                        `;
        }
        else {
            query = `
                       UPDATE statistics SET support_games= support_games + 1 WHERE user_id=?
                        `;
        }
        dbConnection.query({
            sql: query,
            values: [ctx.request.body.user_id]
        }, (error, tuples) => {
            if (error) {
                console.log('Connection error in StatisticsController::updateGames', error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log('Database connection error in updateGames.', err);
        ctx.body = [];
        ctx.status = 500;
    });
}





module.exports = {
    UserRanks,
    updateStats,
    getStats,
    updateWins,
    updateGames


};


