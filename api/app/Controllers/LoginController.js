const dbConnection = require('../../database/mySQLconnect');
const setAccessToken = require('../../config/setAccessToken');
const {value} = require("lodash/seq");


require('dotenv').config();

const authorizeUser = async (ctx) => {
        return new Promise((resolve, reject) => {

	    // Right up here, you could inspect the provided user_id to
	    // make sure that it is, at the surface, a legitimate ID.
	    // For example, if user ids are suppose to be email addresses,
	    // you can at least make sure that user's input is consistent
	    // with the format of email addresses.
             const u_id = ctx.params.user_id.replace('#','-');
            // Regex to check a 3-12 alphanumeric tag, followed by a hyphen and then
            // a series of numbers.
            // const regex = /^([a-zA-Z0-9]){3,12}(-)([0-9])+$/;
            // console.log(regex.test(u_id));
	    
            let query = "SELECT * FROM users WHERE user_id = ?";
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
            console.log('authorize in LoginController threw an exception. Reason...', err);
	    ctx.status = 200;
            ctx.body = {
                status: "Failed",
                error: err,
                user: null
            };
        });
}

const createUser = async(ctx) => {

    //const u_id = ctx.params.user_id.replace('#','-');

    const userTableAttributes = [
        'user_id',
        'queue_status',
        'games_played',
        'games_won'
    ];

    let valuesFromRequest = JSON.parse(JSON.stringify(ctx.request.body)); // make a deep copy of ctx.request.body

    const valuesToInsert = {
        ...valuesFromRequest,
        ...{        // default values
            user_id: valuesFromRequest.hasOwnProperty('user_id') ? valuesFromRequest['user_id'] : 'error_name_whoopsie',
            queue_status: valuesFromRequest.hasOwnProperty('queue_status') ? valuesFromRequest['queue_status'] : 'idle',
            games_played: valuesFromRequest.hasOwnProperty('games_played') ? valuesFromRequest['games_played'] : 0,
            games_won: valuesFromRequest.hasOwnProperty('games_won') ? valuesFromRequest['games_won'] : 0,
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
        console.log(`API server::createUser: ${JSON.stringify(ctx.request.body)}`);
        console.log(`API server::createUser after having added default values: ${JSON.stringify(valuesToInsert)}`);


        const query = `
                       INSERT INTO users (${userTableAttributes})
                              VALUES (${valueMarkers})
                        `;
        dbConnection.query({
            sql: query,
            values: attributeValuesArray
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in LoginController::createUser", error);
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

module.exports = {
    authorizeUser,
    createUser
};
