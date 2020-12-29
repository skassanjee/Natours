const express = require('express');
const fs = require('fs');
const app = express();

//middleware
app.use(express.json());

// app.get('/', (req, res) => {
//     res
//     .status(200)
//     .json({message: 'Hello from the server side!', app: 'Natours'})
// })

// app.post('/',(req, res) => {
//     res.send('You can post to this endpoint...')
// })

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

app.get('/api/v1/tours',  (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    })    
})


//url paramters

app.get('/api/v1/tours/:id',  (req, res) => {
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
})


app.post('/api/v1/tours', (req,res) => {
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
});


//start the server

const port = 3000;
app.listen(port, () =>{
    console.log('App running on port 5000')
});