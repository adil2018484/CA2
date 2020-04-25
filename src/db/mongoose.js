const mongoose = require('mongoose')
// "mongodb+srv://test:test@cluster0-lqmyh.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect('mongodb+srv://test:test@cluster0-lqmyh.mongodb.net/test?retryWrites=true&w=majority',{
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(console.log("Mongodb connected!"))