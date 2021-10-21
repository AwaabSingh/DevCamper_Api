const mongoose = require('mongoose');
// const config = require("config");
// const db = config.get("mongoURL")

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://localhost/DevCamper', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

module.export = connectDB;
