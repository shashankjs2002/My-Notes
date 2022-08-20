const mongoose = require('mongoose')
const PASSWORD = process.env.PASSWORD


const URL =  `mongodb+srv://Shashank:${PASSWORD}@realtime-food-delivery.nnue1.mongodb.net/cloud-notebook?retryWrites=true&w=majority`

const connectTOMongo = () => {
    mongoose.connect(URL, () => {
        console.log('Successfully connected to MongoDb')
    })
}

module.exports = connectTOMongo
