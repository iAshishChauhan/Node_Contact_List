// Creating the schema.

const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
});

// Collection:
const Contact = mongoose.model('Contact', contactSchema);

// Exporting the model or Collection
module.exports = Contact;