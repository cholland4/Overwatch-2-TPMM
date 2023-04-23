const dbConnection = require('../../database/mySQLconnect');
const setAccessToken = require('../../config/setAccessToken');
const {value} = require("lodash/seq");
const axios = require("axios");
const cheerio = require("cheerio");
// const {performScraping} = require("../../api_server");


require('dotenv').config();

function rankToInt(rankStr) {
    switch (rankStr) {
        case "BronzeTier-5":
            return 1000;
        case "BronzeTier-4":
            return 1100;
        case "BronzeTier-3":
            return 1200;
        case "BronzeTier-2":
            return 1300;
        case "BronzeTier-1":
            return 1400;
        case "SilverTier-5":
            return 1500;
        case "SilverTier-4":
            return 1600;
        case "SilverTier-3":
            return 1700;
        case "SilverTier-2":
            return 1800;
        case "SilverTier-1":
            return 1900;
        case "GoldTier-5":
            return 2000;
        case "GoldTier-4":
            return 2100;
        case "GoldTier-3":
            return 2200;
        case "GoldTier-2":
            return 2300;
        case "GoldTier-1":
            return 2400;
        case "PlatinumTier-5":
            return 2500;
        case "PlatinumTier-4":
            return 2600;
        case "PlatinumTier-3":
            return 2700;
        case "PlatinumTier-2":
            return 2800;
        case "PlatinumTier-1":
            return 2900;
        case "DiamondTier-5":
            return 3000;
        case "DiamondTier-4":
            return 3100;
        case "DiamondTier-3":
            return 3200;
        case "DiamondTier-2":
            return 3300;
        case "DiamondTier-1":
            return 3400;
        case "MasterTier-5":
            return 3500;
        case "MasterTier-4":
            return 3600;
        case "MasterTier-3":
            return 3700;
        case "MasterTier-2":
            return 3800;
        case "MasterTier-1":
            return 3900;
        case "GrandmasterTier-5":
            return 4000;
        case "GrandmasterTier-4":
            return 4100;
        case "GrandmasterTier-3":
            return 4200;
        case "GrandmasterTier-2":
            return 4300;
        case "GrandmasterTier-1":
            return 4400;
        default:
            return 2400;
    }
}
async function performScraping(battletag) {
    // downloading the target web page
    // by performing an HTTP GET request in Axios
    // console.log('start', battletag)
    let btag = battletag.replace('#', '-');
    const url = `https://overwatch.blizzard.com/en-us/career/${btag}`;
    const ranks = {tank_rank: 2450, dps_rank: 2450, support_rank: 2450};
    // console.log(url);
    const axiosResponse = await axios.request({
        method: "GET",
        url: url,
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
        }
    }).then( (request) => {
        const $ = cheerio.load(request.data);
        const htmlElement = $(".Profile-playerSummary--roleWrapper")
            .each((index, element) => {
                const rank = ($(element).children('img').attr('src'));
                const role = ($(element).children('div').children('img').attr('src'));
                switch (role.slice(61, -20)) {
                    case 'tank':
                        ranks.tank_rank = rankToInt(rank.slice(61, -15));
                        break;
                    case 'offense':
                        ranks.dps_rank = rankToInt(rank.slice(61, -15));
                        break;
                    case 'support':
                        ranks.support_rank = rankToInt(rank.slice(61, -15));
                        break;
                    default:
                        break;
                }
            });

        console.log(ranks);}
    ).catch((err) => console.log('Error in webscrape: ', "err"))

    return ranks;
}

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
    // this is called to Insert new users into the database when the create Account button is pressed

    const u_id = String(ctx.request.body.user_id);

    const scraped = await performScraping(u_id);

    const userTableAttributes = [
        'user_id',
        'tank_rank',
        'dps_rank',
        'support_rank'
    ];

    let valuesFromRequest = JSON.parse(JSON.stringify(ctx.request.body)); // make a deep copy of ctx.request.body

    const valuesToInsert = {
        ...valuesFromRequest, ...scraped,
        ...{        // default values
            user_id: valuesFromRequest.hasOwnProperty('user_id') ? valuesFromRequest['user_id'] : 'error_name_whoopsie',
            tank_rank: scraped.hasOwnProperty('tank_rank') ? scraped['tank_rank'] : 2450,
            dps_rank: scraped.hasOwnProperty('dps_rank') ? scraped['dps_rank'] : 2450,
            support_rank: scraped.hasOwnProperty('support_rank') ? scraped['support_rank'] : 2450,
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
