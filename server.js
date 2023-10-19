const mongoose = require("mongoose");
const http = require("http");
const env = require("dotenv");
const color = require("colors/safe");

env.config();

const databaseConnection = process.env.MONGODB_URL;

mongoose.set({ strictQuery: true });
mongoose.connect(
  databaseConnection,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, data) => {
    if (data) {
      console.log(color.blue("Successfully connection to Mongodb Database"));
      const app = require("./app");
      const server = http.createServer(app);
      const port = process.env.PORT ?? 3003;
      server.listen(
        port,
        console.info(
          color.black(`Server is listening on port ${port}`),
          color.black(`http://localhost:${port}`)
        )
      );
    } else {
      console.log(color.red("Something went wrong", err.message));
    }
  }
);
