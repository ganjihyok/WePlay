const express = require('express');
const bodyParser = require('body-parser');
const sha256 = require('js-sha256');
const db = require('../db');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../public'));

app.get('/login', (req, res) => {
  req.query.password = sha256(req.query.password);
  db.login(req.query, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get('/emailValidation', (req, res) => {
  db.emailValidation(req.query.email, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get('/usernameValidation', (req, res) => {
  db.usernameValidation(req.query.username, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(201).send(data);
    }
  });
});

app.post('/signup', (req, res) => {
  req.body.password = sha256(req.body.password);
  db.checkAvailability(req.body.email, req.body.username, (err, result) => {
    if (err) {
      res.sendStatus(500);
    } else {
      if (result.length === 0) {
        db.post(req.body, (err, result) => {
          if(err) {
            res.sendStatus(500);
          } else {
            res.sendStatus(201);
          }
        });
      } else {
        res.sendStatus(200);
      }
    }
  });
});

app.get('/songList', (req, res) => {
  db.recentList(req.query.username, req.query.participations, req.query.query, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post('/song', (req, res) => {
  db.postSong(req.body, (err, result) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(200).send(result);
    }
  });
});

app.post('/updateSong', (req, res) => {
  db.updateSong(req.body, (err, result) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(200).send(result);
    }
  });
});

app.post('/updateUser', (req, res) => {
  db.updateUser(req.body.email, req.body.username, req.body.vid_id, req.body.pull, (err, result) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(201).send(result);
    }
  });
});


app.listen(3001, () => {
  console.log('listening on port 3001!');
});