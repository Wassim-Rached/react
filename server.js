import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import path from 'path'

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
const PORT = process.env.PORT || 5000

dotenv.config()
app.use(cors())
app.use(express.json())
app.use(express.static('uploads'));
// mongoose.set('useFindAndModify', false);

//connect to mongodb
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/projectName', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
}).then(() => console.log("DB Connection Successfull"))
.catch((err) => {
  console.error(err);
});

//test
app.post('/api/test',(req,res)=>{
  const {email,password}=req.body
  res.send({email:email,password:password})
})


//CONNECT TO HEROKU
if (process.env.NODE_ENV === 'production') {
  // Step 1:
    app.use(express.static(path.resolve(__dirname, "./client/build")));
  // Step 2:
  app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
  });
}

app.listen(PORT,()=>{
    console.log(`backend server is up on port: 5000`)
})

