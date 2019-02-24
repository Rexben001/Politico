/* eslint-disable no-unused-vars */
/* eslint-disable quotes */

import database from './database';

const { pool } = database;

const {
  users, party, office, candidate, vote, petition, acceptedCandidate
} = database;

const dropTables = 'DROP TABLE IF EXISTS users CASCADE; DROP TABLE IF EXISTS offices CASCADE;DROP TABLE IF EXISTS parties CASCADE; DROP TABLE IF EXISTS candidates CASCADE; DROP TABLE IF EXISTS accept_candidates CASCADE; DROP TABLE IF EXISTS votes CASCADE; DROP TABLE IF EXISTS petitions CASCADE;';

const users1 = `INSERT INTO users(firstname, lastname, username, email, phoneNumber, password, is_admin, passportUrl) VALUES('Ben','John','bendinho','bendinho@gmail.com','+4567899865','$2a$10$uRuYmAhsCNnnIbGGXwcEIOYsUoDC./J1NNAVBeb0/SqeTWVYTjEvK',true,'http://www.locoococcoc/jpg')`;
const users2 = `INSERT INTO users(firstname, lastname, username, email, phoneNumber, password, is_admin, passportUrl) VALUES('Bens','Johns','ben','ben@gmail.com','+4567899865','$2a$10$uRuYmAhsCNnnIbGGXwcEIOYsUoDC./J1NNAVBeb0/SqeTWVYTjEvK',false,'http://www.locoococcoc/jpg')`;
const users3 = `INSERT INTO users(firstname, lastname, username, email, phoneNumber, password, is_admin, passportUrl) VALUES('Love','Peace','Joy','joy@gmail.com','+4567899865','$2a$10$uRuYmAhsCNnnIbGGXwcEIOYsUoDC./J1NNAVBeb0/SqeTWVYTjEvK',false,'http://www.locoococcoc/jpg')`;
const users4 = `INSERT INTO users(firstname, lastname, username, email, phoneNumber, password, is_admin, passportUrl) VALUES('Love','Peace','Joyce','joyce@gmail.com','+4567899865','$2a$10$uRuYmAhsCNnnIbGGXwcEIOYsUoDC./J1NNAVBeb0/SqeTWVYTjEvK',false,'http://www.locoococcoc/jpg')`;

const office1 = `INSERT INTO offices (name, type) VALUES('Senate(Lagos)','Federal')`;
const office2 = `INSERT INTO offices (name, type) VALUES('Governor(Lagos)','State')`;

const parties1 = `INSERT INTO parties (name, hqAddress, logoUrl) VALUES('People Party','Ikorodu, Lagos','pp.jpg')`;
const parties2 = `INSERT INTO parties (name, hqAddress, logoUrl) VALUES('People Love Party','Borno','plp.jpg')`;
const parties3 = `INSERT INTO parties (name, hqAddress, logoUrl) VALUES('Peace Party','Kano','pps.jpg')`;
const parties4 = `INSERT INTO parties (name, hqAddress, logoUrl) VALUES('Peace Love Congress','Kaduna','plc.jpg')`;

const candidate1 = `INSERT INTO candidates(office, party, createdBy) VALUES(1, 3, 3)`;

const accCandidate1 = `INSERT INTO accept_candidates(office, party, createdBy) VALUES(1, 1, 1)`;
const accCandidate2 = `INSERT INTO accept_candidates(office, party, createdBy) VALUES(1, 2, 2)`;

const votes1 = `INSERT INTO votes(office, voter, createdOn, candidate) VALUES(1, 1, NOW(), 1)`;
const votes2 = `INSERT INTO votes(office, voter, createdOn, candidate) VALUES(1, 2, NOW(), 1)`;

const petitions = `INSERT INTO petitions(office, createdOn, createdBy, body, evidence) VALUES(1, NOW(), 1, 'guuiuie.jpg', 'Ballot')`;

const tables = async () => {
  await pool.query(dropTables);
  await users();
  await party();
  await office();
  await candidate();
  await acceptedCandidate();
  await vote();
  await petition();
  await pool.query(`${users1}; ${users2}; ${users3}; ${users4}`);
  await pool.query(`${office1}; ${office2};`);
  await pool.query(`${parties1}; ${parties2}; ${parties3}; ${parties4};`);
  await pool.query(`${candidate1};`);
  await pool.query(`${accCandidate1}; ${accCandidate2};`);
  await pool.query(`${votes1}; ${votes2};`);
  await pool.query(`${petitions};`);
};

tables();
