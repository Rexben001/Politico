import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let connectionString;
const environmentVariable = process.env.NODE_ENV;
if (environmentVariable.includes('test')) {
  connectionString = process.env.TESTING;

} else {
  connectionString = process.env.PRODUCTION;
}
const pool = new pg.Pool({
  connectionString
});

console.log(connectionString);

pool.on('connect', () => { });


const users = async () => {
  const userTable = `
    CREATE TABLE IF NOT EXISTS 
    users(
        user_id SERIAL NOT NULL UNIQUE,
        firstname VARCHAR(128) NOT NULL,
        lastname VARCHAR(128) NOT NULL,
        email VARCHAR(128) NOT NULL,
        password VARCHAR(128) NOT NULL,
        username VARCHAR(128) NOT NULL,
        phoneNumber VARCHAR(128) NOT NULL,
        is_admin BOOLEAN NOT NULL,
        passportUrl VARCHAR(128) NOT NULL,
        UNIQUE(username, email)
        );`;
  await pool.query(userTable)
    .then(() => { })
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
    })
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
    })
};

const candidate = async () => {
  const candidateTable = `
  CREATE TABLE IF NOT EXISTS 
  candidates(
    candidate_id SERIAL NOT NULL UNIQUE,
    office INTEGER,
    party INTEGER,
    acceptance VARCHAR NOT NULL,
    createdBy INTEGER UNIQUE,
    FOREIGN KEY (party) REFERENCES parties(party_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (createdBy) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (office) REFERENCES offices(office_id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (createdBy, office)
  );`;
  await pool.query(candidateTable)
    .then(() => {
    })
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
    FOREIGN KEY (voter) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (office) REFERENCES offices(office_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (candidate) REFERENCES candidates(createdBy) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (office, voter, candidate)
  );`;
  await pool.query(voteTable)
    .then(() => {
    })
};

const petition = async () => {
  const petitionTable = `
  CREATE TABLE IF NOT EXISTS 
  petitions(
    petition_id SERIAL PRIMARY KEY,
    createdOn DATE NOT NULL,
    createdBy INTEGER REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    office INTEGER REFERENCES offices(office_id) ON DELETE CASCADE ON UPDATE CASCADE,
    body VARCHAR NOT NULL,
    evidence VARCHAR
  );`;
  await pool.query(petitionTable)
    .then(() => {
      console.log('Table all created')
    })
};

export default {
  pool, users, party, office, candidate, vote, petition,
};
