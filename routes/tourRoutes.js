const express = require('express')
const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

const getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    })    
}

const getTour =   (req, res) => {
    //req.params assigns
    
    const id = req.params.id * 1 //this converts a string to a number
    const tour = tours.find(el => el.id === id);

    if(!tour){
        return res.status(404).json({
            status: 'fail',
            message: "Invalid"
    })}

    res.status(200).json({
        status: 'success',
        data:{
            tour
        }
    })
}

const createTour = (req,res) => {
    //middleware
   // console.log(req.body);

   //adds new tour to the new tours array
   const newID = tours[tours.length -1 ].id + 1;
   const newTour = Object.assign({id: newID}, req.body);
   tours.push(newTour);
   fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
       //201 stands for "Created"
        res.status(201).json({
        status: 'success',
        data:{
            tour: newTour
        }
        
        })
   })


      // res.send('Done');
}
const updateTour =  (req, res) => {
    
    if(req.params.id *1> tours.length){
        return res.status(404).json({
            status: 'fail',
            message: "Invalid id"
    })}

    res.status(200).json({
        status:'success',
        data:{
            tour: '<updated tour here....'
        }
    })
}
const deleteTour = (req, res) => {
    
    if(req.params.id *1> tours.length){
        return res.status(404).json({
            status: 'fail',
            message: "Invalid id"
    })}

    res.status(204).json({
        status:'success',
        data: null
    })
}

const Router = express.Router();

Router
    .route('/')
    .get(getAllTours)
    .post(createTour)

Router
    .route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour)


module.exports = Router
