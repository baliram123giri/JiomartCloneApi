const express = require('express')
require("dotenv").config()
require("./models/index")
require("./models/tables")
const app = express()
const port = process.env.PORT || 4000

app.use(express.json())
//create a main route
app.use("/api", require("./Routes/index"))

app.use("", async (req, res) => {
    return res.status(404).json({ message: 'Invalid request or invalid URL' })
})

app.listen(port, () => console.log('listening on port ' + port))  //  listen on   http://localhost                



