const http = require("http");
const mongoose = require('mongoose');
const app = require("./app_express")(mongoose, false);

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});
mongoose.set('useCreateIndex', true);
mongoose.set('debug', false);

var api = require('./routes/api.js');
app.use('/api', api);

const httpServer = http.createServer(app);

httpServer.listen(process.env.PORT, function (err) {
  console.log(`Server running at ${process.env.BASE_URL}:${process.env.PORT}/`);
  // console.log('listening on *:' + process.env.PORT);
});