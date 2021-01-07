const app = require('./app')
//start the server

const PORT = 3000;
app.listen(PORT, () =>{
    console.log(`app running on ${PORT}`)
});