const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 
const jwt = require('jsonwebtoken');
const middleware = require('./middleware');
const devuser = require('./devusermodel');
const reviewmodel = require('./reviewmodel');
const cors = require('cors');

const app = express();

app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

mongoose.connect('mongodb://localhost:27017').then(
    () => console.log('DB connected..')
);
app.use(express.json());
app.use(cors({origin:'*'}));

app.get('/', (req, res) => {
    return res.send('Hello, world!!')
});



app.post('/register', async (req, res) => {
    try{
        const {fullname, email, mobile, skill, password, confirmpassword} = req.body;
        const exist = await devuser.findOne({email});
        if(exist){
            return res.status(400).send(`User already exist`);
        }
        if(!(password === confirmpassword)){
            return res.status(400).send(`Password and Confirm Password should be same`);
        }

        let newUser = new devuser({
            fullname,email,mobile,skill,password,confirmpassword
        });

        newUser.save();
        return res.status(200).send(`User registration successful`);
    }
    catch(err){
        console.log(err);
        return res.status(500).send(`Server error`);
    }
});

app.post('/login', async (req, res) => {
    try{
        const {email, password} = req.body;
        const exist = await devuser.findOne({email});
        if(!exist){
            return res.status(400).send(`User not exist`);
        }
        if(exist.password != password){
            return res.status(400).send(`Password Invalid`);        
        }
        let payload = {
            user: {
                id: exist.id
            }
        }

        jwt.sign(payload, 'jwtpassword', {expiresIn:3600000}, 
        (err, token) => {
            if(err) throw err;
            return res.json({token});
        })
    }
   
    catch(err){
        console.log(err);
        return res.status(500).send(`Server Error`);
    }
});

app.get('/allprofiles', middleware, async (req, res) => {
    try{
        let allprofiles = await devuser.find();
        return res.json(allprofiles);
    }
    catch(err){
        console.log(err);
        return res.status(500).send(`Server Error`);
    }
});

app.get('/myprofile', middleware, async (req, res) => {
    try{
        let user = await devuser.findById(req.user.id);
        return res.status(200).json(user);
        
    }
    catch(err){
        console.log(err);
        return res.status(500).send(`Server Error`);
    }
});

app.post('/addreview', middleware, async (req, res) => {
    try{
        const {taskworker, rating} = req.body;
        const exist = await devuser.findById(req.user.id);
        const newReview = new reviewmodel({
            taskprovider: exist.fullname,
            taskworker, rating 
        });

        newReview.save();
        return res.status(200).send("Review updated successfully");
        
    }
    catch(err){
        console.log(err);
        return res.status(500).send(`Server Error`);
    }
});


app.get('/myreview', middleware,  async (req, res) => {
    try{
        const allreviews = await reviewmodel.find();
        let myreview = allreviews.filter(review => review.taskworker.toString() === req.user.id.toString());
        return res.status(200).json(myreview);
    }
    catch(err){
        console.log(err);
        return res.status(500).send(`Server Error`);
    }
});

app.listen(3001, () => console.log(`Server is Running..`));