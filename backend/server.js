import express from 'express'
import config from './config'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

const mongodbUrl = config.MONGODB_URL

mongoose.connect(mongodbUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
}).then( () => {
    console.log('Connected to database ')
}).catch(error=>{
    console.log(error.reason)})


const app = express();

app.use(bodyParser.json())
app.get('/', (req,res)=>{
    res.send("Hello")
})

app.listen(5000, ()=>{console.log("Server started ata http://localhost:5000 ")})