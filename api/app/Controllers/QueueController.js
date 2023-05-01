const dbConnection = require('../../database/mySQLconnect');


const insertUser = async(ctx) => {
    // this is called to Insert new users into the database when the create Account button is pressed

    // const u_id = String(ctx.request.body.user_id);

    const userTableAttributes = [
        'user_id',
        'role',
        'rank_for_role_queued',
        'time_queued'
    ];

    let valuesFromRequest = JSON.parse(JSON.stringify(ctx.request.body)); // make a deep copy of ctx.request.body

    const valuesToInsert = {
        ...valuesFromRequest,
        ...{        // default values
            user_id: valuesFromRequest.hasOwnProperty('user_id') ? valuesFromRequest['user_id'] : 'error_name_whoopsie',
            role: valuesFromRequest.hasOwnProperty('role') ? valuesFromRequest['role'] : 'undefined_role',
            rank_for_role_queued: valuesFromRequest.hasOwnProperty('rank_for_role_queued') ? valuesFromRequest['rank_for_role_queued'] : 2450,
            time_queued: ''
        }
    };

    const valueMarkers = Array(userTableAttributes.length).fill('?').join(', ');

    // insert into tableName (a list of attributes) value(a list of values);

    // valueMarkers now contains eight (routesTableAttributes.length) question marks like so: '?, ?, ?, ?, ?, ?, ?, ?';
    const attributeValuesArray = userTableAttributes.reduce( (valuesAssembled, attribute) => {
        valuesAssembled.push(valuesToInsert[attribute]);
        return valuesAssembled;
    }, []);

    // attributeValuesArray also has routesTableAttributes.length element. Its element i contains
    // values[ routeTableAttributes[i] ]. For example, attributeValuesArray[5] contains 'Active'



    return new Promise((resolve, reject) => {
        console.log(`API server::insertUser: ${JSON.stringify(ctx.request.body)}`);
        console.log(`API server::insertUser after having added default values: ${JSON.stringify(valuesToInsert)}`);

        let query;

        if (valuesFromRequest.rank_for_role_queued >= 3500) {
            query = `
                       INSERT INTO expert_queue (${userTableAttributes})
                              VALUES (${valueMarkers})
                        `;
        }
        else if (valuesFromRequest.rank_for_role_queued >= 2000) {
            query = `
                       INSERT INTO intermediate_queue (${userTableAttributes})
                              VALUES (${valueMarkers})
                        `;
        }
        else {
            query = `
                       INSERT INTO beginner_queue (${userTableAttributes})
                              VALUES (${valueMarkers})
                        `;
        }

        dbConnection.query({
            sql: query,
            values: attributeValuesArray
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in QueueController::insertUser", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });


    })
        .catch(error => console.log(`insertNewUser failed with error message, ${error}`));
}

const removeUser = async(ctx) => {
    const u_id = String(ctx.request.body.user_id);

    return new Promise((resolve, reject) => {

        const query1 = `
                   DELETE FROM expert_queue WHERE user_id=?
                    `;
        const query2 = `
                   DELETE FROM intermediate_queue WHERE user_id=?
                    `;
        const query3 = `
                   DELETE FROM beginner_queue WHERE user_id=?
                    `;

        dbConnection.query({
            sql: query1,
            values: u_id
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in QueueController::removeUser", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
        dbConnection.query({
            sql: query2,
            values: u_id
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in QueueController::removeUser", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
        dbConnection.query({
            sql: query3,
            values: u_id
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in QueueController::removeUser", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });


    })
        .catch(error => console.log(`insertNewUser failed with error message, ${error}`));
}

const numInBeginnerQueue = async (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT DISTINCT user_id FROM beginner_queue WHERE role=?`;
        dbConnection.query({
            sql: query,
            values: ctx.params.role_id
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
        const query = `SELECT DISTINCT user_id FROM intermediate_queue WHERE role=?`;
        dbConnection.query({
            sql: query,
            values: ctx.params.role_id
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
        const query = `SELECT DISTINCT user_id FROM expert_queue WHERE role=?`;
        dbConnection.query({
            sql: query,
            values: ctx.params.role_id
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
    insertUser,
    removeUser,
    numInBeginnerQueue,
    numInIntermediateQueue,
    numInExpertQueue

};