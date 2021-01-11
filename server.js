// const dotenv = require('dotenv')
// dotenv.config({ path: './config.env' })

const mongoose = require('mongoose')
const app = require('./app')

//start the server


console.log(process.env)

//connect to mongoose
mongoose.connect('mongodb://localhost/testaroo')

mongoose.connection.once('open', ()=>{
    console.log('connection made!!!!!!!!!!!!!!!')
}).on('error', (error) =>{
    console.log('error:', error)

})




const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{
    console.log(`app running on ${PORT}`)
});