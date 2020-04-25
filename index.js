const express = require('express')
const bodyParser = require('body-parser')
var path = require("path");
const app = express()
require('./src/db/mongoose')
const ApartmentRouter = require('./src/routers/Apartment')

const port = process.env.PORT || 5000;
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(ApartmentRouter)

app.use(express.static(__dirname+'/Views/'));
app.get('/ApartmentR', function (req, res) {
    res.sendFile(path.join(__dirname+'/views/Apartment.html'));
	
});

app.listen(port, async(req, res)=>{
  res.
  console.log(`Server is running on port ${5000}`)
})