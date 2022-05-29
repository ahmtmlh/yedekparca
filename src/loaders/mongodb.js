const Mongoose = require("mongoose");

const db = Mongoose.connection;

db.once("open", () => {
  console.log("MongoDB connection has been established");
});

const connectDB = async () => {
  const { DB_HOST, DB_PORT, DB_NAME, DB_CONNECT_URL } = process.env;
  let CONNECT_URL = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
  
  if (process.env.NODE_ENV === "production") {
    CONNECT_URL = DB_CONNECT_URL;
  }

  await Mongoose.connect(CONNECT_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  if (process.env.MONGOOSE_DEBUG_ENABLED === "true"){
    Mongoose.set('debug', true)
  }
};

module.exports = {
  connectDB,
};