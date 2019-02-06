import express from 'express';
import bodyParser from 'body-parser';
import partyRouter from './routes/partyRoute';
import officeRouter from './routes/officeRoute';
import userRouter from './routes/userRoute';
import adminRouter from './routes/adminRoute';
import database from './models/database';

const app = express();
const {
  users, party, office, candidate, vote
} = database;

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
  await office();
  await candidate();
  await vote();
};

createTable();


app.use('/api/v1', partyRouter);
app.use('/api/v1', userRouter);
app.use('/api/v1', officeRouter);
app.use('/api/v1', adminRouter);


app.listen(process.env.PORT || 8080, () => {
  console.log('Working');
});


export default app;
