const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://princigupta037:Princi1234@cluster0.1xwqskr.mongodb.net/CompanyDB?retryWrites=true&w=majority',{
            useUnifiedTopology:true,
            useNewUrlParser:true
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDB;