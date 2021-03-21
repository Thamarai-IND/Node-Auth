const exp = require('express');
const cors = require('cors');
const bp = require('body-parser');
const {connect} = require('mongoose');
const {success, error} = require('consola');
const passport = require('passport');


//Bring in the app constants
const {DB, PORT}= require('./config');


//Initialize the application
const app = exp();

// Middlewares
app.use(cors());
app.use(bp.json());
app.use(passport.initialize());

require("./middlewares/passport")(passport);

// User router middleware
app.use('/api/users', require('./routes/users'));

const startApp = async () => {
    try {

        // Connection with DB
        await connect(DB, {
            useUnifiedTopology:true,
            useFindAndModify: true,
            useNewUrlParser:true,
            useCreateIndex:true
        });

        success({
            message:`Sucessfully connected with DB\n ${DB}`,
            badge:true
        });
        // Start Listening for the server
        app.listen(PORT, ()=> 
            success({message:`Server started on PORT ${PORT}`, badge:true})
        );
        app.get('/',(req,res)=>{
            res.send(`Welcome to Dashboard`);
        });
    } catch (err) {
        error({
            message:`Unable to connect with DB ${DB}`,
            badge:true
        })
    }
}

startApp();
