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


const users = async () => {
    const userTable = `
    CREATE TABLE IF NOT EXISTS 
    users(
        user_id SERIAL PRIMARY KEY,
        firstname VARCHAR(128) NOT NULL,
        lastname VARCHAR(128) NOT NULL,
        othernames VARCHAR(128) NOT NULL,
        email VARCHAR(128) NOT NULL,
        password VARCHAR(128) NOT NULL,
        username VARCHAR(128) NOT NULL,
        phoneNumber VARCHAR(128) NOT NULL,
        is_admin BOOLEAN NOT NULL,
        passportUrl VARCHAR(128) NOT NULL,
        UNIQUE(username, email)
        );`;
    await pool.query(userTable)
        .then((res) => {
            // console.log('users table created!: ', res);
        }).catch((err) => {
            console.log('An error occured while creating users table: ', err);
            pool.end();
        });
};

export default { pool, users };
