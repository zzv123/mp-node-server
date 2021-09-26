const mongoose = require('mongoose');
const config = require('../config/config')
let database = config.DataBase
mongoose.connect(`mongodb://localhost/${database}`, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB数据库连接失败:'));
db.once('open', function() {
  console.log(`MongoDB数据库${database}连接成功`)
});