const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const http = require('http');

// Load environment variables (or .env if local environment)
require('dotenv').config();
app.use(bodyParser());
require('./app/Middleware/CORS.js')(app);

// Custom error catch for koa-jwt so that we can log the specific error message
// when attempting to read and parse the access_token
app.use(async (ctx, next) => {
    return next().catch((err) => {
        if(err.status === 401) {
            console.log('index.js: sending 401 to the client.');
            ctx.status = 401;
            ctx.body = 'JWT Token expired. If this was an app in production, you do not want to tell the public why their request was rejected!';
        } else {
            console.log('index.js: one of the modules in the chain fired an exception.');
            console.log(`The error message is ${err}`);
        }
    });
});

// require('./config/courses_routes.js')(app);
require('./config/database_routes.js')(app);

const httpsServer = require('./config/ssl/ssl.js')(app.callback());
httpsServer.listen(process.env.APP_PORT, () => console.log(`Listening on HTTPS port ${process.env.APP_PORT}`));

const axios = require("axios");
const cheerio = require("cheerio");


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
    let btag = battletag.replace('#', '-');
    const axiosResponse = await axios.request({
        method: "GET",
        url: `https://overwatch.blizzard.com/en-us/career/${btag}`,
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
        }
    })
    const $ = cheerio.load(axiosResponse.data);
    const ranks = {tank: null, damage: null, support: null};
    const htmlElement = $(".Profile-playerSummary--roleWrapper")
        .each((index, element) => {
            const rank = ($(element).children('img').attr('src'));
            const role = ($(element).children('div').children('img').attr('src'));
            switch (role.slice(61, -20)) {
                case 'tank':
                    ranks.tank = rankToInt(rank.slice(61, -15));
                    break;
                case 'offense':
                    ranks.damage = rankToInt(rank.slice(61, -15));
                    break;
                case 'support':
                    ranks.support = rankToInt(rank.slice(61, -15));
                    break;
                default:
                    break;
        }
    });

    console.log(ranks);
    return ranks;
}
// performScraping('Archangel#12958');

module.exports = {performScraping};
