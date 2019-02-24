import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';
import cors from 'cors';
import partyRouter from './routes/partyRoute';
import officeRouter from './routes/officeRoute';
import userRouter from './routes/userRoute';
import adminRouter from './routes/adminRoute';
import database from './models/database';


const app = express();
const {
  users, party, office, candidate, vote, petition, acceptedCandidate
} = database;

const swaggerDoc = yaml.load(`${process.cwd()}/swagger.yaml`);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(
  cors({
    origin: "*",
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS",
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
);

app.all('/*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => {
  res.status(200).json('Welcome to politico Express');
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
