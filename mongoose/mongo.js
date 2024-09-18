const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect(process.env.mongoUrl, {
      useNewURLParser: true,
    });

    // await client.connect();
    console.log("Database Connected");
  } catch {
    (err) => {
      console.log(err.message);
      process.exit(1);
    };
  }
};

module.exports = connect;
