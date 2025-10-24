var Car = require('./car');
const dboperations = require('./dboperations');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

router.use(request, response, next => {
    console.log('middleware');
    next();
});

router.route('/cars').get((request, response) => {
    dboperations.getCars().then(cars => {
        response.json(cars[0]);
    }).catch(error => {
        response.status(500).send(error);
    });
})

var port = process.env.PORT || 8090;
app.listen(port);
console.log('API is running on port ' + port);
