import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new pg.Pool({
  connectionString: process.env.PRODUCTION
})

pool.on('connect', () => {
  console.log('connected to the Database');
});


const users = async () => {
  const userTable = `
    CREATE TABLE IF NOT EXISTS 
    users(
        user_id SERIAL NOT NULL UNIQUE,
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
        party_id SERIAL NOT NULL UNIQUE,
        name VARCHAR NOT NULL UNIQUE,
        hqAddress VARCHAR NOT NULL UNIQUE,
        logoUrl VARCHAR NOT NULL UNIQUE
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

const candidate = async () => {
  const candidateTable = `
  CREATE TABLE IF NOT EXISTS 
  candidates(
    candidate_id SERIAL NOT NULL UNIQUE,
    office INTEGER,
    party INTEGER,
    createdBy INTEGER UNIQUE,
    FOREIGN KEY (party) REFERENCES parties(party_id),
    FOREIGN KEY (createdBy) REFERENCES users(user_id),
    FOREIGN KEY (office) REFERENCES offices(office_id),
    PRIMARY KEY (createdBy, office)
  );`;
  await pool.query(candidateTable)
    .then(() => {
      console.log('candidate table created!: ');
    }).catch((err) => {
      console.log('An error occured while creating candidate table: ', err);
      pool.end();
    });
};

const vote = async () => {
  const voteTable = `
  CREATE TABLE IF NOT EXISTS 
  votes(
    vote_id SERIAL NOT NULL UNIQUE,
    createdOn DATE NOT NULL,
    voter INTEGER,
    candidate INTEGER,
    office INTEGER,
    FOREIGN KEY (voter) REFERENCES users(user_id),
    FOREIGN KEY (office) REFERENCES offices(office_id),
    FOREIGN KEY (candidate) REFERENCES candidates(candidate_id),
    PRIMARY KEY (office, voter, candidate)
  );`;
  await pool.query(voteTable)
    .then(() => {
      console.log('vote table created!: ');
    }).catch((err) => {
      console.log('An error occured while creating vote table: ', err);
      pool.end();
    });
};

export default {
  pool, users, party, office, candidate, vote
};
