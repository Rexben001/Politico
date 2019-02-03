import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/route';
import database from './models/database';

const app = express();
const { users, party } = database;

app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());

app.get('/', (req, res) => res.status(200).json({
  status: 200,
  message: 'Politico Xpress',
}));

const createTable = async () => {
  await users();
  await party();
};

createTable();

app.use('/api/v1', router);

app.listen(process.env.PORT || 8080, () => {
  console.log('Working');
});


export default app;
