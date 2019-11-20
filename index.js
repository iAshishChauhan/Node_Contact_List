const express= require('express');
const path = require('path');
const port = 8000;
const db = require('./config/mongoose');
const Contact = require('./models/contact');

//Creating an express Server.
const app = express();

// Setting up our Template/View Engine with ejs:
app.set('view engine', 'ejs'); // => view engine is ejs.

// Setting up our views in the views path or folder directory.
app.set('views', path.join(__dirname,'views'));

// Parser which is a middleWare.
app.use(express.urlencoded());

// Including the static Files.
app.use(express.static('assets'));

/*

// Creating our own MiddleWare.
// MiddleWarw1
app.use(function(req,res,next){  //next is for moving to next MW or Controller.
    console.log('Middleware 1 called');
    next();
});

// Middleware 2
app.use(function(req,res,next){
    console.log('Middleware 2 called!');
    next();
});

*/
/*
var contactList = [
    {
        name : 'Steve',
        phone: '8005002777'
    },
    {
        name: 'Ritvik',
        phone: '9092030806'
    },
    {
        name: 'Gaurang',
        phone: '8118809922'
    }
];
*/

app.get('/', function(req,res){
   Contact.find({}, function(err, contacts){
       if(err) {
           console.log('Error in getting contacts from db');
           return;
       }
        res.render('home', {       //This whole part is called context and it is passed as locals.
        title: 'Contacts List',
        contact_list: contacts
     });
   });
});

app.get('/practice', function(req,res){
    res.render('practice', {
        title: 'Practice Playground'
    });
});

// Controller to handle the post request.
app.post('/create-contact', function(req, res){
    // console.log(req.body);

    // contactList.push(
    //     {
    //         name: req.body.name,
    //         phone: req.body.phone
    //     }        
    // );

    // OR We can directly use because form name as it was same as the keys in contactList object:

    // contactList.push(req.body);

    // return res.redirect('/');
    // OR
    // return res.redirect('back');
    // ***************************************

    // Creating contacts using schema.
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err) {console.log('Error in creating contact'); return;}
        // console.log(newContact);
        return res.redirect('back');
    });

});

// Deleting a contact
app.get('/delete-contact', function(req,res){
    // console.log(req.query);
    // get the id from query in url
    let id = req.query.id;  //This .id after query variable is passed from href of delete button.

    // find the contact in the database using id and delete it.
    Contact.findByIdAndDelete(id, function(err){
        if(err) {
            console.log('Error in deleting the object from Database');
            return;
        }
        return res.redirect('back');
    });
    
    /*
    let contactIndex = contactList.findIndex(contact => contact.id == id);

    if(contactIndex != -1) {
        contactList.splice(contactIndex, 1);
    }

    return res.redirect('back');
    */
});


app.listen(port, function(err){
    if(err) {
        console.log(err);
        return;
    }
    console.log('Express Server is up and running on Port Number:', port);
});