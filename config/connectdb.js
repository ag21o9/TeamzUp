var mongoose = require('mongoose');

const connect = async ()=>{
    const connection = await mongoose.connect(process.env.DBSTRING);
    console.log("Connection Established Successfully with "+connection.connection.name);
}

module.exports = connect;