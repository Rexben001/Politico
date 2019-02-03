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

// const onlineDB = process.env.ELEPHANTSQL;

const pool = new pg.Pool(
  {
    connectionString: 'postgres://gklwunop:LhHMN3D61GirLtgdpHyzSK3shzT7tSev@elmer.db.elephantsql.com:5432/gklwunop'
  } || localhost
);

// console.log(onlineDB);

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
    .then(() => {
      console.log('users table created!: ');
    }).catch((err) => {
      console.log('An error occured while creating users table: ', err);
      pool.end();
    });
};

const party = async () => {
  const partyTable = `
      CREATE TABLE IF NOT EXISTS 
      parties(
        party_id SERIAL PRIMARY KEY,
        name VARCHAR NOT NULL,
        hqAddress VARCHAR NOT NULL,
        logoUrl VARCHAR NOT NULL
      );`;
  await pool.query(partyTable)
    .then(() => {
      console.log('parties table created!: ');
    }).catch((err) => {
      console.log('An error occured while creating party table: ', err);
      pool.end();
    });
};

const office = async () => {
  const officeTable = `
  CREATE TABLE IF NOT EXISTS 
  offices(
      office_id SERIAL PRIMARY KEY,
      type VARCHAR NOT NULL,
      name VARCHAR NOT NULL
      );`;
  await pool.query(officeTable)
    .then(() => {
      console.log('offices table created!: ');
    }).catch((err) => {
      console.log('An error occured while creating office table: ', err);
      pool.end();
    });
};

export default { pool, users, party, office };
