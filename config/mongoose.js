// including the the mongoose library.
const mongoose = require('mongoose');

// connecting to the database.
mongoose.connect('mongodb://localhost/contacts_list_db');

// acquire the connection (to check if it is successful).
const db = mongoose.connection;

// error
db.on('error', console.error.bind(console, 'Error connecting to DB'));

// up and running then print the success message.
db.once('open', function(){
    console.log('Successfully connected to Database');
});