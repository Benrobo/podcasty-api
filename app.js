const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors")

const app = express();

app.use(cors())
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));


app.use("/api", require("./routes/getPodcast"))


// get products
const PORT = process.env.PORT | 5000

app.get("/", (req, res) => {
    return res.json({ msg: "hey welcome to kwickquick" })
})


app.listen(PORT, "0.0.0.0")
