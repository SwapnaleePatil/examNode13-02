var express = require('express');
var bodyParser = require('body-parser');
const _ = require('lodash');
var {user} = require('./modal/user');
var {city} = require('./modal/city');
var {state} = require('./modal/state');
var app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {

    res.header('Access-Control-Allow-Origin','http://localhost:3000');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,x-auth");
    res.header("Access-Control-Allow-Credentials",true);
    res.header(`Access-Control-Allow-Methods`, `POST`);
    res.header(`Access-Control-Allow-Methods`, `DELETE`);
    res.header(`Access-Control-Allow-Methods`, `PATCH`);
    res.header(`Access-Control-Expose-Headers`, `x-auth`);
    next();
});
app.get('/', (req, res) => {
    res.send("WelCOme To This Site");
});
app.post('/savedata', (req, res) => {
    console.log("Req:", req.body);

    var newuser = new user({

        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        state1: req.body.state1,
        city: req.body.city
    });

    newuser.save().then(() => {

            res.send(newuser)
            console.log("Record Inserted");
        }
    ).catch((e) => {
        console.log("Error", e);
    });
});
app.get('/fetch', (req, res) => {
    user.find({flag:true}, (err, user) => {
        if (err) {
            console.log("Error", err);
        }
        console.log("User", user)
        res.send(user);
    });
})
app.get('/fetchAss', (req, res) => {
    user.find({}).sort({fname: 1}).exec(function (err, user) {
        if
        (err) {
            console.log("Error", err);
        }
        console.log(user)
        res.send(user);
    });
})
app.get('/fetchDes', (req, res) => {
    user.find({}).sort({fname: -1}).exec(function (err, user) {
        if
        (err) {
            console.log("Error", err);
        }
        console.log(user)
        res.send(user);
    });
})
app.get('/fetchcity', (req, res) => {

    city.find({}, (err, city) => {
        if (err) {
            console.log("Error", err);
        }
        console.log(city)
        res.send(city);
    });
})
app.get('/fetchstate', (req, res) => {
    state.find({}, (err, state) => {
        if (err) {
            console.log("Error", err);
        }
        console.log(state)
        res.send(state);
    });
})
app.post('/delete', (req, res) => {

    let id = req.body.id;
    console.log(id);
    user.findByIdAndUpdate(id,{$set : {flag:"false"}}).then((user) => {
        if (!user) {
            console.log("User Not Found");
        }
        res.send(user);
    }).catch((e) => {
        console.log(`error : ${e.message}`);
        res.status(404).send();
    })
});
app.post('/edit', (req, res) => {
    let id = req.body.id;
    console.log("Edit id", req.body.id);
    user.find({_id: id}).then((user) => {
        if (!user) {
            console.log("Record Not Found ");
            res.status(404).send();
        }
        console.log("Edit", user);
        res.send(user);
    }).catch((e) => {
        console.log("Error", e);
        res.status(404).send();
    });
});
app.post('/update', (req, res) => {
    let body = _.pick(req.body, ['id', 'fname', 'lname', 'email', 'state', 'city']);
    let id = req.body.id;

    console.log("Body:", body);
    user.findByIdAndUpdate(id, {$set: body}).then((user) => {
        if (!user) {
            console.log("Data Not Found");
            res.status(404).send();
        }
        res.send(user);
    }).catch((e) => {
        console.log("Error", e);
    });
});
app.post('/savecity', (req, res) => {
    console.log("SaveCity");
    console.log("Req:", req.body);

    var newcity = new city({
        city: req.body.city,
        state1: req.body.state,
    });
    newcity.save().then(() => {
            res.send(newcity)
            console.log("Record Inserted");
        }
    ).catch((e) => {
        console.log("Error", e);
    });
});
app.post('/savestate', (req, res) => {
    console.log("Req:", req.body);

    var newstate = new state({

        state1: req.body.state

    });

    newstate.save().then(() => {

            res.send(newstate)
            console.log("Record Inserted");
        }
    ).catch((e) => {
        console.log("Error", e);
    });
});
app.post('/userData', (req, res ,next)=> {
    var page=req.body.pno;
    var records=req.body.records;

    console.log("Page",page);
    console.log("Records",records);
    if(page==1)
    {
        user.find().limit(records).then((data)=>{
            if(!data){
                console.log("Data Not Found");
            }
            res.send(data);
        }).catch((e)=>{
            console.log("Error",e);
        })
    }
    else
    {
        user.find().skip(records*(page-1)).limit(records).then((data)=>{
            if(!data){
                console.log("Data Not Found");
            }
            res.send(data);
        }).catch((e)=>{
            console.log("Error",e);
        })
    }
  })
app.listen('5051');