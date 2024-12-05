const dotenv = require('dotenv')
dotenv.config()

const axios = require('axios')
const express = require('express')
const app = express()
const PORT = process.env.PORT ? process.env.PORT : '3000'

app.use(express.urlencoded({ extended: false }))

app.get('/', (req,res)=>{
  res.render('index.ejs')
})

app.post('/weather/show.ejs', (req,res)=>{
  const zip = req.body.zip
  axios ({
    method: 'post',
    url: `http://api.openweathermap.org/data/2.5/weather?q=${zip},us&APPID=${process.env.API}`
  })
  .then((response)=>{
    res.render('/weather/show.ejs', { data: response.data })
  })
  .catch((err)=>{
    console.log(err)
  })
})

app.listen(PORT, () => {
  console.log(`Auth App is listening for requests on port ${PORT}`)
})