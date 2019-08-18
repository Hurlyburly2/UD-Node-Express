const path = require('path')
const express = require('express')
const hbs = require('hbs')
require('dotenv').config()

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public/')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Doug'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Doug'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    helpMessage: 'This is a help message',
    name: 'Doug'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({ error: 'Address not provided.' })
  }

  const location = req.query.address
  geocode(location, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error: error })
    }
    forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error: error })
        }
        
        return res.send({
          location,
          forecastData
        })
    })
  })
})

app.get('/products', (req,res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('notFound', {
    title: "404 Not Found",
    text: "Help page not found",
    name: 'Doug'
  })
})

app.get('*', (req, res) => {
  res.render('notFound', {
    title: '404 Not Found',
    text: 'Your page was not found',
    name: 'Doug'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000')
})