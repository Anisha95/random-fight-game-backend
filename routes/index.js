var express = require('express');
var router = express.Router();
const random_name = require('node-random-name');
const Players = require('../models/players');
const Fights = require('../models/fight')
const random = require('math-random');
const floor = require('math-floor');



// GET home page.

router.get('/', function(req, res, next) {
  res.render('index', { title: 'My Page' });
});


 router.get('/hero', function(req, res) {
    Players.find().then(function (players) {
        res.send(players);
    })
});


// this is to create  a player !!

router.post('/hero', function (req, res) {
    Players.create({
        ...req.body,
        name: random_name()
    }).then(function (players) {
        res.send(players);
    })
});

// starting the game i.e. the fighting  between the two enabled players

router.get('/fight', function(req, res) {
     Players.aggregate([ {$match : {active : true}}, {$sample : {size : 2} }]).then(function (players) {

        var b  = (players);
        var c = floor(random());
        var d = 1-c;
        var x = b[c];
        var y = b[d];
        x.active = false;
        //console.log(y);
        if(y == undefined){
            res.send('Only 1 Player left! Please create a new player..');
            res.status(401);
            return false;
        }
        Players.findByIdAndUpdate({"_id" : x._id}, { $set: {"active" : false}},  function(err, user){
        });
        Players.findByIdAndUpdate({"_id" : y._id}, { $inc: { score: 30} },  function(err, user){});
        var fight = new Fights();

        fight.player_1_id = x._id;
        fight.player_1_name = x.name;
        fight.player_2_id = y._id;
        fight.player_2_name = y.name;
        fight.winning_player_id = y._id;
        fight.created_at = Date.now();
        fight.save();
        res.send({
            players: b,
            loser: x
        });
    })
});



// to get all the records of the fights till date..

router.get('/fight-logs', function(req, res) {
    Fights.find().then(function (fight) {
        res.send(fight);
    })
});

module.exports = router;
