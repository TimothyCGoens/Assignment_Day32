const express = require('express')
const bodyParser = require('body-parser')
const mustacheExpress = require('mustache-express')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.engine('mustache', mustacheExpress())

app.set('views', './views')

app.set('view engine', 'mustache')

trips = []

app.get('/add-trip',(req,res) => {
  res.render('add-trip',{trips: trips})
})


app.post('/add-trip', (req,res) => {
  let tripDestination = req.body.destination
  let tripDepartureDate = req.body.departureDate
  let tripReturnDate = req.body.returnDate
  let tripDestinationImage = req.body.destinationImg
  let id = guid()

  let trip = { destination: tripDestination,
               departureDate: tripDepartureDate,
               returnDate: tripReturnDate,
               destinationImg: tripDestinationImage,
               id: id}
  trips.push(trip)

  res.redirect('/add-trip')
})

function guid(){
  return (((1+Math.random())*0x100000)|0).toString(16).substring(1);
}

app.post('/delete-trip',(req,res) => {
  let tripID = req.body.id

  trips = trips.filter(function(trip) {
    return trip.id != tripID
  })
  res.render('add-trip',{trips: trips})
})

app.listen(3000,() => {
  console.log('Server is running...')
})
