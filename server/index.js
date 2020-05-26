const keys = require('./keys');

// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgres Client Setup
const { Pool } = require('pg');
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort
});
pgClient.on('error', () => console.log('Lost PG connection'));

pgClient
  .query('CREATE TABLE IF NOT EXISTS blog (blogid INTEGER, date TIMESTAMP, title VARCHAR(50), blogpost VARCHAR(5000))')
  .catch(err => console.log(err));

pgClient
  .query('INSERT INTO blog(date, blogid, title, blogpost) VALUES(current_timestamp,$1,$2,$3)',
    [00, 'TEST', 'THIS IS A SAMPLE BLOG POST'])
  .catch(err => console.log(err));

// Express route handler

app.get('/', (req, res) => {
  res.send('Hi');
});

app.get('/values/insertsample', async (req, res) => {
  const blogid = await pgClient.query('select count(*) from blog')

  const title = 'Sample Post ' + blogid.rows[0].count;
  const blogpost = 'This is a sample post. Short and sweet';

  pgClient.query(
    'INSERT INTO blog(date, blogid, title, blogpost) VALUES(current_timestamp,$1,$2,$3)',
    [blogid.rows[0].count, title, blogpost]
  );

  res.send({ inserted: [blogid.rows[0].count, title, blogpost] });

});

app.get('/values/all', async (req, res) => {
  const values = await pgClient.query('SELECT * from blog');

  res.send(values.rows);
});

app.get('/values/totalblogs', async (req, res) => {
  const totalblogs = await pgClient.query('select count(*) from blog')

  res.send(totalblogs.rows[0].count)
});

app.post('/values/delete', async (req, res) => {
  const values = await pgClient.query('delete from blog');
  res.send({ status: 200 });
});


app.post('/values', async (req, res) => {
  const blogid = req.body.blogid;
  const title = req.body.title;
  const blogpost = req.body.blogpost;

  pgClient.query(
    'INSERT INTO blog(date, blogid, title, blogpost) VALUES(current_timestamp,$1,$2,$3)',
    [blogid, title, blogpost]
  );

  res.send({ working: true });
});

app.listen(5000, err => {
  console.log('Listening');
});
