const express = require('express')
const tourController = require('../controllers/tourController')


const Router = express.Router();

Router.param('id', (req, res, next, val) => {
    console.log(`tour id is ${val} `)
    next();
})


Router
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.createTour)

Router
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour)


module.exports = Router
