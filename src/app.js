const path = require('path')
const express = require('express')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public/')

app.set('view engine', 'hbs')
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
    helpMessage: 'This is a help message'
  })
})

app.get('/weather', (req, res) => {
  res.send({
    location: "Boston",
    temperature: 70,
    forecast: "Maybe it'll rain I dunno"
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000')
})