const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const middlewares = require('./middlewares');
const logs = require('./api/logs');

const app = express();

main().catch(error => console.log(error));

async function main() {
  await mongoose.connect('mongodb+srv://tathagata1805:tatha123123@cluster0.7cw0r.mongodb.net/travel-log?retryWrites=true&w=majority'), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false, 
  useCreateIndex: true
}}

app.use(morgan('common'));
app.use(helmet());
app.use(cors({
  origin: "http://localhost:3000",
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World!',
  });
});

app.use('/api/logs', logs);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);
app.use(middlewares.corsError);

const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});