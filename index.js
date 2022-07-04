const express = require('express')
const connectTOMongo = require('./db');

var cors = require('cors')

const app = express()


app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000

connectTOMongo()

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

//step 3: Heroku
if (process.env.NODE_ENV = "production") {
    app.use(express.static("client/build")); 
    const path = require("path"); 
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

app.use((req, res) => {
    res.status(404).send("404")
})

// app.get('/', (req, res) => {
//     res.send("This is home page")
// })

// app.get('/about', (req, res)=>{
//     res.send("This is about page")
// })


app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})