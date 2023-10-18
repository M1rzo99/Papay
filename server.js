
const http = require('http');
const mongodb = require("mongodb");
// for MongoDB
let db;
const connectionString = "mongodb+srv://Mirzo:kcu87Q49fdODeRXt@cluster0.pzgqtca.mongodb.net/Reja?retryWrites=true&w=majority"
mongodb.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err, client) => {
    if (err) console.log("Error connection MongoDB");
    else {
        console.log("DataBase MongoDB Connection succseed");
        module.exports = client;
        const app = require("./app");

        const server = http.createServer(app);
        let PORT = 3003;
        server.listen(PORT, function () {
            console.log(`the server is running succesfully on port ${PORT},http://localhost:${PORT}`);
        });
    }
});