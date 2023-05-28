const mongoose = require('mongoose');
async function connect() {
  try {
    await mongoose.connect('mongodb://127.0.0.1/nodejs_example_1');
    console.log('connect successfully');
  } catch (error) {
    console.log('connect fail');
  }
}
module.exports = { connect };
