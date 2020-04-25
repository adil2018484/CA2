const mongoose = require('mongoose')

const apartmentSchema  = mongoose.Schema({

  apartNo : {
    type: Number,
    required: [true, "Apartment number is required" ],
    unique: true,
    min: [1, "Appartment number must not be less than 1" ]
  },
  apartName : {
    type: String,
    required: [true, "Apartment name is required" ],
    trim : true,
    
  },
  floorNo : {
    type: Number,
    required: [true, "Floor number is required" ],
    trim : true,
    min: [1, "Floor number must not be less than 1" ]
  },
  buildingName : {
    type: String,
    required: [true, "Building name is required" ],
    trim : true
  },
  address : {
    type: String,
    required: [true, "Address is required" ],
    trim : true
  },
  city: {
    type: String,
    required: [true, "City is required" ],
    trim : true
  },
  apartAreaSqFeet : {
    type: Number,
    required : [true, "Apartment area is required" ],
    trim: true,
    min: [10, "Appartment must not be less than 10 Square feet" ]
    },
  noOfRooms : {
    type: Number, 
    required: [true, "Number of rooms is required" ],
    min: [1, "Appartment must have at least 1 room" ]
  },
  balcony: {
    type: Boolean,
    required: [true, "Balaony Included or not" ],
  }


})
const Apartment = mongoose.model('Apartment', apartmentSchema)
module.exports = Apartment;