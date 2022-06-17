import express from "express";
import bodyParser from 'body-parser';
import http from 'http';
import routes from './api/routes/users';

const app = express();
const router = express();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

/** RULES OF OUR API */
router.use((req, res, next) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
});

const db = require("./config/db");

// force: true will drop the table if it already exists
db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and Resync with { force: true }");
});

router.get('/',(req,res) => {
    res.send('Hello form Express and Typescript')
});

router.use('/', routes);

/** Error handling */
router.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

const httpServer = http.createServer(router);
const PORT = process.env.PORT || 3000 ;
httpServer.listen(PORT,() =>console.log(`App listening on PORT ${PORT}`));;