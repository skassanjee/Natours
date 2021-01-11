const dotenv = require('dotenv').config({ path: 'config.env' })
const express = require('express');
const fs = require('fs');
const app = express();
const morgan = require('morgan')
const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

//middleware
if(process.env.NODE_ENV='development'){
    app.use(morgan('dev'))
}


app.use(express.json());

app.use((req, res, next) => {
    //next can be called anything, but MUST be third
    //req must be first, res must be second
    console.log('hello from the middleware')
    next()
})


const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

//handler functions


//Routes
// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);  //url paramters -- getting ONE tour
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours:id', updateTour) //patch request -- updating data crUd
// app.delete('/api/v1/tours:id', deleteTour)//delete request
0
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

module.exports = app