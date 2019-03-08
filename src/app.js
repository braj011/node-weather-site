
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname, "../public"))

const app = express()  
const port = process.env.PORT || 3000


// Define Paths for Express config
const pubDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, '../templates/views')    // in this example, the views folder has been renamed to 'templates'
const partialsPath = path.join(__dirname, '../templates/partials')

//  Setup handlebars engine, views and partials location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(pubDirectoryPath))


// Dynamic pages (routes) - have since deleted the static pages in public folder
app.get('', (req, res) => {
  res.render('', {
    title: "Weather App",
    name: "Bhagya Raj"
  }) 
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: "About Me",
    name: "Bhagya Raj" 
  }) 
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: "Help!!",
    content: "This is a very helpful message",
    name: "Bhagya Raj" 
  }) 
})

//  Static Routes
// Don't need root, /help or /about since there are assets in the public directory

      // app.get('', (request, response) => {
      //   response.send("<h1>Yeemwah Ekspwess!</h1")
      // })

      // app.get('/help', (request, response) => {
      //   response.send({
      //     Menu: {
      //       starters: "vege spring rolls",
      //       main: "aubergine"
      //     }
      //   })
      // })

      // app.get('/about', (request, response) => {
      //   response.send("<h1>About</h1")
      // })

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address."
    })
  } 

  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    // Lec 56, added default function parameters, empty object
    if (error) {
        return res.send({error})
    }
    forecast(latitude, longitude, (error, forecastData, temperature) => {
      // included an extra temperature param in the callback for forecast - NOT IN VIDEO
        if (error) {
            return res.send({error})
        }
        res.send({
          forecast: forecastData,
          location,
          temperature: temperature,
          address: req.query.address
        }) 
  })
})



  // res.send({
  //     forecast: "It will be windy and sad :(",
  //     location: "London",
  //     address: req.query.address
  // })
})

// EXAMPLE
    // app.get('/products', (req, res) => {
    //   if (!req.query.search) {
    //     return res.send({
    //       error: "You must provide a search term."
    //     })
    //   }
    //   console.log(req.query.search)
    //   res.send({
    //     products: []
    //   })
    // })

// subset 404 / wildcard for /help/*anything_else*
app.get('/help/*', (request, response) => {
  response.render('404', {
    title: "404 help",
    errorMessage: "Help article not found",
    name: "Bhagya Raj" 
  })
})

// 404 page get() comes last
app.get('*', (request, response) => {
  response.render('404', {
    title: "404 page",
    errorMessage: "Page not found",
    name: "Bhagya Raj" 
  })
})



app.listen(port, () => {
  console.log(`Server is running on port ${port}`) 
})