const mongoose = require('mongoose');

module.exports =()=>{
    mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true}, { useUnifiedTopology: true });

    mongoose.connection.on('open', ()=>{
        console.log('DB baglanti saglandi.');
    });

    mongoose.connection.on('error', (err)=>{
        console.log('Db error: ', err);
    });

    mongoose.Promise = global.Promise;
};