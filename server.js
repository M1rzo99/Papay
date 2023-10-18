// dotenv bu bizni malumotarimzini boshqalarga ko'rinmasligini ta'minlab beradi,Ya'ni himoyalab beradi.

const dotenv = require("dotenv");
dotenv.config();


const http = require('http');
const mongoose = require("mongoose");
// for MongoDB
const connectionString = process.env.MONGO_URL;
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err, goose) => {
    if (err) console.log("Error connection MongoDB");

    else {
        console.log("DataBase MongoDB Connection succseed");
        // console.log(goose);

        const app = require("./app");

        const server = http.createServer(app);
        let PORT = process.env.PORT || 3008;
        server.listen(PORT, function () {
            console.log(`the server is running succesfully on port ${PORT},http://localhost:${PORT}`);
        });
    }
});



