const express = require('express')
const bodyP = require('body-parser')
const cors = require('cors')
const joi = require('joi')
//router variables 

const route = express.Router()
const app = express()
const port = process.env.PORT || 8000;


// app.use() function binds utilities 

app.use(cors());
app.use(bodyP.urlencoded({extended:true}));
app.use(bodyP.json());


//POST Method to get response from user

route.post('/adduser', async (req,res) => {
try{
    console.log(req.body)
    let schema = joi.object({
        name: joi.string().required(),
        age: joi.number().required(),
        dob: joi.string().required(),
        status: joi.string().required().valid('active','inactive')
    })
    let data = await schema.validateAsync(req.body)
    console.log(data)
    return res.send(data)
} catch(error) {
  res.send({error: error.details[0].message})
}
})

route.post('/course', async (req,res) => {
    try{
        console.log(req.body)
        let schema = joi.object({
            courseName: joi.string().required(),
            feedback: joi.array().items(
               joi.object({
                 name: joi.string(),
                 marks: joi.number()
               })
             )
           })
           let data = await schema.validateAsync(req.body)
           console.log(data)
           return res.send(data)
    } catch(error) {
      res.send({error: error.details[0].message})
    }
   
 })

app.use('/api',route);
app.listen(port, () => console.log('listening server at '+ port));



