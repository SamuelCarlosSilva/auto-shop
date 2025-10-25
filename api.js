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

router.use((request, response, next) => {
    console.log('middleware');
    next();
});

router.route('/cars').get((request, response) => {
    dboperations.getCars().then(cars => {
        response.json(cars);
    }).catch(error => {
        response.status(500).send(error);
    });
})

router.route('/cars/:id').patch((request, response) => {
  let car = {...request.body};
  dboperations.updateCar(car).then(car => {
    response.json(car);
  }).catch(error => {
    response.status(500).send(error);
  });
})

router.route('/cars/:id').delete((request, response) => {
  let id = request.params.id;
  dboperations.deleteCar(id).then(car => {
    response.json(car);
  }).catch(error => {
    response.status(500).send(error);
  });
})

router.route('/cars').post((request, response) => {
  let car = {...request.body};
  dboperations.addCar(car).then(car => {
    response.json(car);
  }).catch(error => {
    response.status(500).send(error);
  });
})

router.route('/cars/:id').get((request, response) => {
  let id = request.params.id;
  dboperations.getCar(id).then(car => {
    response.json(car[0]);
  }).catch(error => {
    response.status(500).send(error);
  });
})


var port = process.env.PORT || 8090;
app.listen(port);
console.log('API is running on port ' + port);
