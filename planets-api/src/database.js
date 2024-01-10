const mongoose = require("mongoose");

console.log("Connecting to ", process.env.MONGODB_URI);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(async (db) => {
    console.log("Db is connected");  
  })
  .catch((err) => console.error(err));
