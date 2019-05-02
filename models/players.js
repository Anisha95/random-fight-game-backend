const  mongoose = require('mongoose');
const Schema = mongoose.Schema;


// create player Schema & Model for the game! :)

const PlayerSchema = new Schema({
    active : Boolean,
    score : Number,
    name  : String ,
});

// create databases

const  Players = mongoose.model('players', PlayerSchema);



module.exports= Players;


