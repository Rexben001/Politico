import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const localhost = {
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
};

const onlineDB = process.env.ELEPHANTSQL;

const pool = new pg.Pool(localhost || onlineDB);

pool.on('connect', () => {
    console.log('connected to the Database');
});

