const dbConnection = require('../../database/mySQLconnect');
const setAccessToken = require('../../config/setAccessToken');


require('dotenv').config();

const authorizeUser = async (ctx) => {
        return new Promise((resolve, reject) => {

	    // Right up here, you could inspect the provided user_id to
	    // make sure that it is, at the surface, a legitimate ID.
	    // For example, if user ids are suppose to be email addresses,
	    // you can at least make sure that user's input is consistent
	    // with the format of email addresses.
        //     const u_id = ctx.params.user_id.replace('#','-');
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

module.exports = {
    authorizeUser,
};
