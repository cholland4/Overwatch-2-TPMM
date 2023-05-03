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


const addRank = async (ctx) => {
    console.log(`API server::addRank: ${JSON.stringify(ctx.request.body)}`);

    const role = ctx.params.role_id;

    return new Promise((resolve, reject) => {
        let query;

        if (role === 'tank') {
            query = `
                       UPDATE users SET tank_rank= tank_rank + 25 WHERE user_id=?
                        `;
        }
        else if (role === 'dps') {
            query = `
                       UPDATE users SET dps_rank= dps_rank + 25 WHERE user_id=?
                        `;
        }
        else {
            query = `
                       UPDATE users SET support_rank= support_rank + 25 WHERE user_id=?
                        `;
        }
        dbConnection.query({
            sql: query,
            values: [ctx.params.user_id]
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


const subtractRank = async (ctx) => {
    console.log(`API server::subtractRank: ${JSON.stringify(ctx.request.body)}`);

    const role = ctx.params.role_id;

    return new Promise((resolve, reject) => {
        let query;

        if (role === 'tank') {
            query = `
                       UPDATE users SET tank_rank= tank_rank - 25 WHERE user_id=?
                        `;
        }
        else if (role === 'dps') {
            query = `
                       UPDATE users SET dps_rank= dps_rank - 25 WHERE user_id=?
                        `;
        }
        else {
            query = `
                       UPDATE users SET support_rank= support_rank - 25 WHERE user_id=?
                        `;
        }
        dbConnection.query({
            sql: query,
            values: [ctx.params.user_id]
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

const numInBeginnerQueue = async (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT DISTINCT user_id, role, rank_for_role_queued FROM beginner_queue WHERE role=?`;
        dbConnection.query({
            sql: query,
            values: ctx.params.role_id
        }, (error, tuples) => {
            if (error) {
                console.log('Connection error in QueueController::numInBeginnerQueue', error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log('Database connection error in numInBeginnerQueue.', err);
        ctx.body = [];
        ctx.status = 500;
    });
}


const numInIntermediateQueue = async (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT DISTINCT user_id, role, rank_for_role_queued FROM intermediate_queue WHERE role=?`;
        dbConnection.query({
            sql: query,
            values: ctx.params.role_id
        }, (error, tuples) => {
            if (error) {
                console.log('Connection error in QueueController::numInIntermediateQueue', error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log('Database connection error in numInIntermediateQueue.', err);
        ctx.body = [];
        ctx.status = 500;
    });
}


const numInExpertQueue = async (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT DISTINCT user_id, role, rank_for_role_queued FROM expert_queue WHERE role=?`;
        dbConnection.query({
            sql: query,
            values: ctx.params.role_id
        }, (error, tuples) => {
            if (error) {
                console.log('Connection error in QueueController::numInExpertQueue', error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log('Database connection error in numInExpertQueue.', err);
        ctx.body = [];
        ctx.status = 500;
    });
}



function split(elem, tanks, damage, supports) {
    switch (elem.role) {
        case "tank":
            tanks.push(elem);
            break;
        case "dps":
            damage.push(elem);
            break;
        case "support":
            supports.push(elem);
            break;
        default:
            break;
    }
}

function select(arr, num) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

function balance(role) {
    // balance within the role
    let bestPair = [];
    let average2 = 0;
    let bestDifference = 5000;
    let totalsr = 0;
    role.forEach(element => {totalsr += element.rank_for_role_queued});

    for (let i = 1; i < role.length; i++) {
        let avg1 = (role[0].rank_for_role_queued + role[i].rank_for_role_queued) / 2;
        let avg2 = (totalsr - role[0].rank_for_role_queued - role[i].rank_for_role_queued) / 2;
        let difference = avg1 - avg2;
        if (Math.abs(difference) < Math.abs(bestDifference)) {
            average2 = avg2;
            bestDifference = difference;
            bestPair = [avg1, role[0].user_id, role[i].user_id];
        }
    }

    let otherPair = [average2];
    for (let i = 0; i < role.length; i++) {
        if (bestPair.indexOf( role[i].user_id ) === -1) {
            otherPair.push(role[i].user_id)
        }
    }
    return [bestPair, otherPair];
}

const matchmake = async (ctx) => {
    const queue = JSON.parse(JSON.stringify(ctx.request.body));

    let tanks = [];
    let damage = [];
    let supports = [];
    let team1 = [];
    let team2 = [];

    queue.forEach((elem) => split(elem, tanks, damage, supports));

    // console.log(tanks, damage, supports);

    let t = select(tanks, 2);
    let d = balance(select(damage, 4));
    let s = balance(select(supports, 4));

    let dReverse = false
    let sReverse = false
    let tankDiff = Math.abs(t[0].rank_for_role_queued - t[1].rank_for_role_queued)
    let dpsDiff = d[0][0] - d[1][0]
    let suppDiff = s[0][0] - s[1][0]
    let average1 = t[0].rank_for_role_queued
    let average2 = t[1].rank_for_role_queued
    team1.push(t[0].user_id);
    team2.push(t[1].user_id);

    // brute force calculation of combined sr average
    let bestDiff = tankDiff + dpsDiff + suppDiff
    if (Math.abs(tankDiff - dpsDiff + suppDiff) < Math.abs(bestDiff)) {
        bestDiff = tankDiff - dpsDiff + suppDiff
        sReverse = false;
        dReverse = true;
    }
    if (Math.abs(tankDiff + dpsDiff - suppDiff) < Math.abs(bestDiff)){
        bestDiff = tankDiff + dpsDiff - suppDiff
        dReverse = false;
        sReverse = true;
    }
    if (Math.abs(tankDiff - dpsDiff - suppDiff) < Math.abs(bestDiff)){
        dReverse = true;
        sReverse = true;
    }

    // add to team A or B depending on above calculations
    if (dReverse){
        team1.push(d[1][1]);
        team1.push(d[1][2]);
        team2.push(d[0][1]);
        team2.push(d[0][2]);
        average1 += d[1][0];
        average2 += d[0][0];
    }
    else {
        team1.push(d[0][1]);
        team1.push(d[0][2]);
        team2.push(d[1][1]);
        team2.push(d[1][2]);
        average1 += d[0][0];
        average2 += d[1][0];
    }

    if (sReverse){
        team1.push(s[1][1]);
        team1.push(s[1][2]);
        team2.push(s[0][1]);
        team2.push(s[0][2]);
        average1 += s[1][0];
        average2 += s[0][0];
    }
    else {
        team1.push(s[0][1]);
        team1.push(s[0][2]);
        team2.push(s[1][1]);
        team2.push(s[1][2]);
        average1 += s[0][0];
        average2 += s[1][0];
    }

    ctx.body = ([team1, team2, Math.floor(average1 / 3), Math.floor(average2 / 3)]);
    return [team1, team2, Math.floor(average1 / 3), Math.floor(average2 / 3)];
}

module.exports = {
    insertUser,
    removeUser,
    numInBeginnerQueue,
    numInIntermediateQueue,
    numInExpertQueue,
    matchmake,
    addRank,
    subtractRank


};