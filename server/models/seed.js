
import database from './database';

const { pool } = database;
const seedDatabase = () => {
  const createUser = `INSERT INTO users(firstname, lastname, othernames, username,
        email, phoneNumber, password, is_admin, passportUrl) VALUES('James', 'John', 'Tommy', 'Tom', 'tom@gmail.com', '+2345678678', '123456', 'https://www.politico.com/12233') RETURNING *`;

  const createUser2 = `INSERT INTO users(firstname, lastname, othernames, username,
  email, phoneNumber, password, is_admin, passportUrl) VALUES('Dames', 'Dohn', 'Dommy', 'Dom', 'Dom@gmail.com', '+234567678', '9uee89', 'https://www.politico.com/233') RETURNING *`;

  const createParty = `INSERT INTO parties (name, hqAddress, logoUrl) VALUES('People Precious Party(PPP)', 'Block 33, Abuja', 'https://www.politico.com/ppp') RETURNING*`;

  const createParty2 = `INSERT INTO parties (name, hqAddress, logoUrl) VALUES('Precious Party(PP)', 'Block 93, Ado-Ekiti, Ekiti', 'https://www.politico.com/pp') RETURNING*`;

  const createOffice = `INSERT INTO offices (name, type) VALUES('Chairman', 'Lekki LCDA') RETURNING*`;

  const createOffice2 = `INSERT INTO offices (name, type) VALUES('Senator', 'Anambra') RETURNING*`;

  const queries = `${createUser}${createUser2}${createParty}${createParty2}${createOffice}${createOffice2}`;

  pool.query(queries, (err) => {
    if (err) console.log('Seed table', console.err);
  });
}

export default seedDatabase;