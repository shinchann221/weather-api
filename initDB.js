const mongoose = require('mongoose');
// require('dotenv').config();

mongoose.pluralize(null);

const MONGO_URI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=${process.env.AUTH_DB}`;

//Connect to Mongo DB
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Successfully connect to MongoDB.');
  })
  .catch((err) => {
    console.error('Connection Error', err);
  });

var db = mongoose.connection;

module.exports = db;
