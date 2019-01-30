import express from 'express';

const app = express();


app.get('/', (req, res) => res.status(200).json({
    status: 200,
    message: 'Politico Xpress',
}));

app.listen(process.env.PORT || 8080);


export default app;