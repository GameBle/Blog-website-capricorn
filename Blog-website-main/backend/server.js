const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');
const commentRoutes = require('./routes/commentRoutes');
const path = require('path');


dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000
connectDB();

app.use(express.json())
app.use('/blogs',blogRoutes)
app.use('/user',userRoutes)
app.use('/comment',commentRoutes)

const __dirname1 = path.resolve();

if(process.env.Node_Env=='production'){
    app.use(express.static(path.join(__dirname1,'./frontend/build')));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname1,"./frontend/build/index.html"))
    })
}
else{
    
    app.get('/',(req,res)=>{
        res.send('ok');
    })
}




app.listen(PORT,console.log("server at "+PORT));