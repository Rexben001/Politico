import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';
import cors from 'cors';
import path from 'path';
import config from './config';
import partyRouter from './routes/partyRoute';
import officeRouter from './routes/officeRoute';
import userRouter from './routes/userRoute';
import adminRouter from './routes/adminRoute';
import database from './models/database';


const app = express();
const { cloudinaryConfig } = config;
const {
  users, party, office, candidate, vote, petition, acceptedCandidate
} = database;

const swaggerDoc = yaml.load(`${process.cwd()}/swagger.yaml`);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
// const VIEWS = path.join(process.env.PWD, './../ui');
// app.use('./../ui', express.static(VIEWS));
// app.use('/../ui', express.static(path.join(__dirname, '/../ui')));


app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());
app.use(cors());
app.use('*', cloudinaryConfig);


app.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname, 'index.html'));
  res.json('Welcome to politico Express');
});

const createTable = async () => {
  await users();
  await party();
  await office();
  await candidate();
  await acceptedCandidate();
  await vote();
  await petition();
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
