const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./model");
const router = require("./router/index.router");
const createError = require("http-errors");
const path = require('path')
const image = require("./controller/image.controller");
// Middleware

app.use(express.static(path.join(__dirname, 'public/image')))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

db.sequelize.sync();
app.use("/api/v1", router);
app.get("/images/:fileName", image.getFile);


// Routing
app.use(async (req, res, next) => {
    next(createError(404, "Not Found"));
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        status: false,
        error: {
            status: err.status || 500,
            message:
                process.env.MODE === "development" ? err.message : "Error Occoured",
        },
    });
});

// Listen
app.listen(port, () => {
    console.log(`Server is listening on PORT No. ${port}`);
});

