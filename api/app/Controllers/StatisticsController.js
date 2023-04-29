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
    return new Promise((resolve, reject) => {
        const query = `UPDATE statistics SET damage_done =?, healing_done =? WHERE user_id=?`;
        dbConnection.query({
            sql: query,
            values: [ctx.params.damage_done, ctx.params.healing_done, ctx.params.user_id]
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
    UserRanks,
    updateStats

};


