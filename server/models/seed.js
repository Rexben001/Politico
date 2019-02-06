
import database from './database';

const { pool } = database;
const seedDatabase = () => {
  try {
    // dropDatabase();
    const createUser = `INSERT INTO users(firstname, lastname, othernames, username,
        email, phoneNumber, password, is_admin, passportUrl) VALUES('James', 'John', 'Tommy', 'Som', 'som@gmail.com', '+2345678678', '123456', false, 'https://www.politico.com/12233') RETURNING *`;
    pool.query(createUser, (err, res) => {
      if (err) console.log('Seed table', err);
      console.log('res1');
    });

    const createParty = `INSERT INTO parties (name, hqAddress, logoUrl) VALUES('People Precious Party(PPP)', 'Block 33, Abuja', 'https://www.politico.com/ppp') RETURNING*`;
    pool.query(createParty, (err, res) => {
      if (err) console.log('Seed table', err);
      console.log('res3');
    });


    const createOffice = `INSERT INTO offices (name, type) VALUES('Chairman', 'Lekki LCDA') RETURNING*`;
    pool.query(createOffice, (err, res) => {
      if (err) console.log('Seed table', err);
      console.log('res 5');
    });

  } catch (e) {
    console.log(e);
    pool.end();
  }
};

export default seedDatabase;
