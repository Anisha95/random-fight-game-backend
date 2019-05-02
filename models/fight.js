const  mongoose = require('mongoose');
const Schema = mongoose.Schema;
'use strict';

// create Fight  Schema & Model for the game! :)

const FightSchema = new Schema({
    player_1_id : String,
    player_1_name : String,
    player_2_id  : String ,
    player_2_name : String,
    winning_player_id : String,
    created_at  : { type : Date, default: Date.now }
});

// create databases

const  Fight = mongoose.model('fight', FightSchema);



module.exports= Fight;