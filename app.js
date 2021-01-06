const express = require('express');
const fs = require('fs');
const app = express();
const morgan = require('morgan')
const tourRouter = require('./routes/tourRoutes')

//middleware

app.use(morgan('dev'))

app.use(express.json());

app.use((req, res, next) => {
    //next can be called anything, but MUST be third
    //req must be first, res must be second
    console.log('hello from the middleware')
    next()
})


const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

//handler functions



const getAllUsers = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'this route is not yet defined!'
    })
}

const createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'this route is not yet defined!'
    })
}

const getUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'this route is not yet defined!'
    })
}
const deleteUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'this route is not yet defined!'
    })
}

const updateUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'this route is not yet defined!'
    })
}
//Routes
// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);  //url paramters -- getting ONE tour
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours:id', updateTour) //patch request -- updating data crUd
// app.delete('/api/v1/tours:id', deleteTour)//delete request






const userRouter = express.Router();



app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)



userRouter
    .route('/')
    .get(getAllUsers)
    .post(createUser)

userRouter
    .route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser)





//start the server

const PORT = 3000;
app.listen(PORT, () =>{
    console.log(`app running on ${PORT}`)
});