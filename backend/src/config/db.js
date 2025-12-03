const mongoose = require('mongoose');

module.exports = function () {
  const uri = process.env.MONGO_URI;
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((e) => console.error('MongoDB conn error', e));
};