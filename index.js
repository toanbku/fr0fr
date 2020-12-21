const express = require('express')
const fetch = require('node-fetch');
const fs = require('fs');

const app = express();

app.get('/', function (req, res) {
  res.send('toanbku');
})

app.get('/write/:filename/:content', function (req, res) {
  const { filename, content } = req.params;
  const path = `./res/${filename}.txt`;

  try {
    if (fs.existsSync(path)) {
      fs.appendFile(path, `${content}\n`, function (err) {
        if (err) return console.log(err);
      });
    } else {
      fs.writeFile(path, `${content}\n`, function (err) {
        if (err) throw err;
      });
    }
  } catch (err) {
    console.error(err);
  }
  res.send('oke');
});

app.get('/read/:filename', function (req, res) {
  const { filename } = req.params;
  const path = `./res/${filename}.txt`;
  if (!fs.existsSync(path)) {
    return res.send('File not found');
  };
  fs.readFile(path, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    res.send(data);
  });
});


console.log('open PORT: ', process.env.PORT)
app.listen(process.env.PORT)
// app.listen(3000)