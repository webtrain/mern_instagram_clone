const mongoose = require('mongoose');

const mongoDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useFindAndModify: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(`Connected to database: ${conn.connection.host}`.cyan.underline);
  } catch (err) {
    console.error(`Error: ${err.message}`.red.underline);
    process.exit(1);
  }
};

module.exports = mongoDB;
