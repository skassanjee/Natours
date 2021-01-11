const fs = require('fs')
const Tour = require('../models/tourModel')
//const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

exports.getAllTours = async (req, res) => {
    try{
        const tours = await Tour.find()

        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: {
                tours
            }
        })    
    } catch(err){
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
   
}

exports.getTour =  async (req, res) => {
  try{
   const tour = await Tour.findById(req.params.id)
   res.status(200).json({
    status: 'success',
    data:{
        tour
    }
})
  } catch(err){
    res.status(404).json({
        status: 'fail',
        message: err
    })
  }



}
    //req.params assigns
    
  //const id = req.params.id * 1 //this converts a string to a number
    // const tour = tours.find(el => el.id === id);

    // if(!tour){
    //     return res.status(404).json({
    //         status: 'fail',
    //         message: "Invalid"
    // })}

    


exports.createTour = async (req,res) => {
    try{
   const newTour = await Tour.create(req.body)
    res.status(201).json({
        status: 'success',
        data:{
            tour: newTour
        }
        
    })
    
} catch(err){
      
    res.status(400).json({
        status: 'fail',
        message: "invalid data was sent!!"
    })
    }
}   

//     //middleware
//    // console.log(req.body);

//    //adds new tour to the new tours array
//    const newID = tours[tours.length -1 ].id + 1;
//    const newTour = Object.assign({id: newID}, req.body);
//    tours.push(newTour);
//    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
//        //201 stands for "Created"
//         res.status(201).json({
//         status: 'success',
//         data:{
//             tour: newTour
//         }
        
//         })
//    })
     // res.send('Done');


exports.updateTour =  async (req, res) => {
    try{
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            status:'success',
            data:{
                tour
    } 
})
 } catch(err){
        res.status(404).json({
            status: 'fail',
            message: "Invalid id"
        })
    }
};





exports.deleteTour = async (req, res) => {
    try{
        await Tour.findOneAndDelete(req.params.id)

         res.status(204).json({
        status:'success',
        data: null
    })
}catch(err){
    err
}
}